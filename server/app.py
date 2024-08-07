from config import app, db, api
from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models import User, Recipe, Comment, Rating, Bookmark
from sqlalchemy import or_
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from datetime import timedelta, datetime

def upload_image_to_cloudinary(image_url):
    result = upload(image_url)
    cloudinary_image_url, _ = cloudinary_url(result['public_id'], width=300, height=300, crop="fill")
    return cloudinary_image_url

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        profile_image_url = data.get('profile_image_url')

        if not username or not email or not password or not profile_image_url:
            return {"error": "All fields are required"}, 400

        if User.query.filter_by(username=username).first():
            return {"error": "Username already exists"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "Email already exists"}, 400

        # Upload profile image to Cloudinary
        try:
            cloudinary_profile_image_url = upload_image_to_cloudinary(profile_image_url)
        except Exception as e:
            return {"error": f"Image upload failed: {str(e)}"}, 500

        new_user = User(
            username=username,
            email=email,
            profile_image_url=cloudinary_profile_image_url
        )
        new_user.password = password  # This will hash the password

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id, expires_delta=timedelta(days=36500))
        refresh_token = create_refresh_token(identity=new_user.id)

        return {
            "message": "User created successfully",
            "access_token": access_token,
            "refresh_token": refresh_token
        }, 201

class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {"error": "Username and password are required"}, 400

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=36500))
            refresh_token = create_refresh_token(identity=user.id)
            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }, 200
        else:
            return {"error": "Invalid username or password"}, 401

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def post(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return {"access_token": access_token}, 200

class RecipeResource(Resource):
    def get(self, recipe_id=None):
        if recipe_id is None:
            # Handling query parameters for search, filter, and pagination
            search_query = request.args.get('search')
            country = request.args.get('country')
            rating = request.args.get('rating', type=float)
            ingredients = request.args.get('ingredients')
            servings = request.args.get('servings', type=int)
            createdDateTime = request.args.get('createdDateTime')
            page = request.args.get('page', default=1, type=int)
            per_page = request.args.get('per_page', default=10, type=int)
            
            # Base query
            query = Recipe.query
            
            # Search functionality
            if search_query:
                query = query.filter(
                    or_(
                        Recipe.title.ilike(f'%{search_query}%'),
                        Recipe.ingredients.ilike(f'%{search_query}%'),
                        Recipe.servings.ilike(f'%{search_query}%')
                    )
                )
            
            # Filter by country
            if country:
                query = query.filter_by(country=country)
            
            # Filter by rating
            if rating is not None:
                query = query.having(
                    db.func.round(db.func.avg(Rating.value), 2) >= rating
                )
            
            # Filter by ingredients (substring match)
            if ingredients:
                query = query.filter(Recipe.ingredients.ilike(f'%{ingredients}%'))
            
            # Filter by servings
            if servings:
                query = query.filter_by(servings=servings)
            
            # Filter by creation date
            if createdDateTime:
                query = query.filter(db.func.date(Recipe.created_at) == createdDateTime)
            
            # Pagination
            recipes = query.paginate(page=page, per_page=per_page, error_out=False)
            total_pages = recipes.pages
            recipe_list = [self.format_recipe(recipe) for recipe in recipes.items]
            
            return jsonify({
                "recipes": recipe_list,
                "page": page,
                "total_pages": total_pages,
                "total_recipes": recipes.total
            })
        
        else:
            # Get a single recipe by ID
            recipe = Recipe.query.get_or_404(recipe_id)
            recipe_data = self.format_recipe(recipe, include_details=True)
            return jsonify({"recipe": recipe_data})

    @jwt_required()
    def post(self):
        data = request.get_json()
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return {"error": "User not found"}, 404

        try:
            # Upload recipe image to Cloudinary
            cloudinary_recipe_image_url = upload_image_to_cloudinary(data.get('recipe_image_url'))

            new_recipe = Recipe(
                recipe_image_url=cloudinary_recipe_image_url,
                title=data.get('title'),
                description=data.get('description'),
                ingredients=data.get('ingredients'),
                procedure=data.get('procedure'),
                servings=data.get('servings'),
                cooking_time=data.get('cooking_time'),
                difficulty_level=data.get('difficulty_level'),
                country=data.get('country'),
                user_id=current_user_id
            )
            
            db.session.add(new_recipe)
            db.session.commit()
            
            return {"message": "Recipe created successfully", "recipe": self.format_recipe(new_recipe)}, 201
        except Exception as e:
            return {"error": str(e)}, 500

    @jwt_required()
    def put(self, recipe_id):
        data = request.get_json()
        current_user_id = get_jwt_identity()
        recipe = Recipe.query.get_or_404(recipe_id)
        
        if recipe.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        # Optionally upload a new recipe image to Cloudinary
        if data.get('recipe_image_url'):
            recipe.recipe_image_url = upload_image_to_cloudinary(data.get('recipe_image_url'))

        recipe.title = data.get('title', recipe.title)
        recipe.description = data.get('description', recipe.description)
        recipe.ingredients = data.get('ingredients', recipe.ingredients)
        recipe.procedure = data.get('procedure', recipe.procedure)
        recipe.servings = data.get('servings', recipe.servings)
        recipe.cooking_time = data.get('cooking_time', recipe.cooking_time)
        recipe.difficulty_level = data.get('difficulty_level', recipe.difficulty_level)
        recipe.country = data.get('country', recipe.country)
        recipe.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return {"message": "Recipe updated successfully", "recipe": self.format_recipe(recipe)}, 200


    @jwt_required()
    def delete(self, recipe_id):
        current_user_id = get_jwt_identity()
        recipe = Recipe.query.get_or_404(recipe_id)
        
        if recipe.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        db.session.delete(recipe)
        db.session.commit()
        
        return {"message": "Recipe deleted successfully"}, 200

    def format_recipe(self, recipe, include_details=False):
        # Calculate the average rating
        ratings = Rating.query.filter_by(recipe_id=recipe.id).all()
        average_rating = round(sum(rating.value for rating in ratings) / len(ratings), 2) if ratings else None

        data = {
            'id': recipe.id,
            "recipe_image_url": recipe.recipe_image_url,
            'title': recipe.title,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'procedure': recipe.procedure,
            'servings': recipe.servings,
            'cooking_time': recipe.cooking_time,
            'difficulty_level': recipe.difficulty_level,
            'country': recipe.country,
            'user_id': recipe.user_id,
            'created_at': recipe.created_at.isoformat() if recipe.created_at else None,
            'updated_at': recipe.updated_at.isoformat() if recipe.updated_at else None,
            'average_rating': average_rating  # Include the average rating in the response
        }
        
        if include_details:
            data['comments'] = [self.format_comment(comment) for comment in recipe.comments]
            data['bookmark_count'] = Bookmark.query.filter_by(recipe_id=recipe.id).count()
        
        
        return data

    def format_comment(self, comment):
        return {
            'id': comment.id,
            'content': comment.content,
            'user': {
                'id': comment.user.id,
                'username': comment.user.username,
                'profile_image_url': comment.user.profile_image_url
            },
            'created_at': comment.created_at.isoformat() if comment.created_at else None,
            'updated_at': comment.updated_at.isoformat() if comment.updated_at else None
    }



class UserProfile(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return {"error": "User not found"}, 404
        
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "profile_image_url": user.profile_image_url,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat()
        }
        
        # Get user's recipes
        recipes = [self.format_recipe(recipe) for recipe in user.recipes]
        
        # Get user's bookmarks
        bookmarks = [self.format_recipe(bookmark.recipe) for bookmark in user.bookmarks]
        
        return {
            "user": user_data,
            "recipes": recipes,
            "bookmarks": bookmarks
        }, 200
    
    @jwt_required()
    def put(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return {"error": "User not found"}, 404
        
        data = request.get_json()
        
        # Update user fields
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'profile_image_url' in data:
            try:
                user.profile_image_url = upload_image_to_cloudinary(data['profile_image_url'])
            except Exception as e:
                return {"error": f"Image upload failed: {str(e)}"}, 500
        
        # You might want to add more fields here as needed
        
        db.session.commit()
        
        updated_user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "profile_image_url": user.profile_image_url,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat()
        }
        
        return {"message": "User profile updated successfully", "user": updated_user_data}, 200

    def format_recipe(self, recipe):
        return {
            'id': recipe.id,
            'title': recipe.title,
            'description': recipe.description,
            'cooking_time': recipe.cooking_time,
            'difficulty_level': recipe.difficulty_level,
            'country': recipe.country,
        }



class CommentResource(Resource):
    def get(self, recipe_id=None, comment_id=None):
        if recipe_id is not None and comment_id is None:
            # Get all comments for a specific recipe
            comments = Comment.query.filter_by(recipe_id=recipe_id).all()
            return jsonify({"comments": [self.format_comment(comment) for comment in comments]})
        
        elif recipe_id is not None and comment_id is not None:
            # Get a specific comment for a specific recipe
            comment = Comment.query.filter_by(id=comment_id, recipe_id=recipe_id).first_or_404()
            return jsonify({"comment": self.format_comment(comment)})
        
        else:
            return {"error": "Invalid request parameters"}, 400


    # Create a new comment for a specific recipe
    @jwt_required()
    def post(self, recipe_id):
        data = request.get_json()
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return {"error": "User not found"}, 404

        new_comment = Comment(
            content=data['content'], 
            user_id=current_user_id, 
            recipe_id=recipe_id
        )
        db.session.add(new_comment)
        db.session.commit()
        
        return {"comment": self.format_comment(new_comment)}, 201


    # Update a specific comment for a specific recipe
    @jwt_required()
    def put(self, recipe_id, comment_id):
        data = request.get_json()
        current_user_id = get_jwt_identity()
        comment = Comment.query.filter_by(id=comment_id, recipe_id=recipe_id).first_or_404()
        
        if comment.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        comment.content = data.get('content', comment.content)
        db.session.commit()
        
        return jsonify({"comment": self.format_comment(comment)})

    # Delete a specific comment for a specific recipe
    @jwt_required()
    def delete(self, recipe_id, comment_id):
        current_user_id = get_jwt_identity()
        comment = Comment.query.filter_by(id=comment_id, recipe_id=recipe_id).first_or_404()
        
        if comment.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        db.session.delete(comment)
        db.session.commit()
        
        return {"message": "Comment deleted successfully"}, 200

    def format_comment(self, comment):
        return {
            'id': comment.id,
            'content': comment.content,
            'user_id': comment.user_id,
            'recipe_id': comment.recipe_id,
            'created_at': comment.created_at.isoformat() if comment.created_at else None,
            'updated_at': comment.updated_at.isoformat() if comment.updated_at else None
        }

class RatingResource(Resource):
    def get(self, recipe_id=None, rating_id=None):
        if recipe_id is not None and rating_id is None:
            # Get all ratings for a specific recipe
            ratings = Rating.query.filter_by(recipe_id=recipe_id).all()
            return jsonify({"ratings": [self.format_rating(rating) for rating in ratings]})
        
        elif recipe_id is not None and rating_id is not None:
            # Get a specific rating for a specific recipe
            rating = Rating.query.filter_by(id=rating_id, recipe_id=recipe_id).first_or_404()
            return jsonify({"rating": self.format_rating(rating)})
        
        else:
            return {"error": "Invalid request parameters"}, 400

    # Create a new rating for a specific recipe
    @jwt_required()
    def post(self, recipe_id):
        data = request.get_json()
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return {"error": "User not found"}, 404

        rating_value = data.get('value')
        if rating_value is None or not (1 <= rating_value <= 5):
            return {"error": "Rating must be between 1 and 5"}, 400
        
        # Handling multiple ratings from the same user
        existing_rating = Rating.query.filter_by(user_id=current_user_id, recipe_id=recipe_id).first()
        if existing_rating:
            return {"error": "User has already rated this recipe"}, 400

        new_rating = Rating(
            value=rating_value, 
            user_id=current_user_id, 
            recipe_id=recipe_id
        )
        db.session.add(new_rating)
        db.session.commit()
        
        return {"rating": self.format_rating(new_rating)}, 201
    
    # Delete a specific rating for a specific recipe
    @jwt_required()
    def delete(self, recipe_id, rating_id):
        current_user_id = get_jwt_identity()
        rating = Rating.query.filter_by(id=rating_id, recipe_id=recipe_id).first_or_404()
        
        if rating.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        db.session.delete(rating)
        db.session.commit()
        
        return {"message": "Rating deleted successfully"}, 200

    def format_rating(self, rating):
        return {
            'id': rating.id,
            'value': rating.value,
            'user_id': rating.user_id,
            'recipe_id': rating.recipe_id,
            'created_at': rating.created_at.isoformat() if rating.created_at else None
        }


class BookmarkResource(Resource):
    # Create a new bookmark for a specific recipe
    @jwt_required()
    def post(self, recipe_id):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        recipe = Recipe.query.get(recipe_id)
        
        if not user or not recipe:
            return {"error": "User or Recipe not found"}, 404
        
        # Check if bookmark already exists
        existing_bookmark = Bookmark.query.filter_by(user_id=current_user_id, recipe_id=recipe_id).first()
        if existing_bookmark:
            return {"error": "Bookmark already exists"}, 400
        
        new_bookmark = Bookmark(
            user_id=current_user_id, 
            recipe_id=recipe_id
        )
        db.session.add(new_bookmark)
        db.session.commit()
        
        return {"bookmark": self.format_bookmark(new_bookmark)}, 201
    
    @jwt_required()
    def delete(self, recipe_id, bookmark_id):
        current_user_id = get_jwt_identity()
        bookmark = Bookmark.query.filter_by(id=bookmark_id, recipe_id=recipe_id).first_or_404()
        
        if bookmark.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        db.session.delete(bookmark)
        db.session.commit()
        
        return {"message": "Bookmark deleted successfully"}, 200

    def format_bookmark(self, bookmark):
        return {
            'id': bookmark.id,
            'user_id': bookmark.user_id,
            'recipe_id': bookmark.recipe_id,
            'created_at': bookmark.created_at.isoformat() if bookmark.created_at else None
        }




api.add_resource(UserProfile, '/profile')
api.add_resource(Signup, '/users')
api.add_resource(Login, '/login')
api.add_resource(RefreshToken, '/refresh')
api.add_resource(RecipeResource, '/recipes', '/recipes/<int:recipe_id>')
api.add_resource(CommentResource, '/recipes/<int:recipe_id>/comments', '/recipes/<int:recipe_id>/comments/<int:comment_id>')
api.add_resource(RatingResource, '/recipes/<int:recipe_id>/ratings', '/recipes/<int:recipe_id>/ratings/<int:rating_id>')
api.add_resource(BookmarkResource, '/recipes/<int:recipe_id>/bookmarks', '/recipes/<int:recipe_id>/bookmarks/<int:bookmark_id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
