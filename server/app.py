from config import app, db, api
from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models import User, Recipe, Comment, Bookmark

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

        new_user = User(
            username=username,
            email=email,
            profile_image_url=profile_image_url
        )
        new_user.password = password  # This will hash the password

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id)
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
            access_token = create_access_token(identity=user.id)
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
            # Get all recipes
            recipes = Recipe.query.all()
            recipe_list = []
            
            for recipe in recipes:
                recipe_data = self.format_recipe(recipe)
                recipe_list.append(recipe_data)
            
            return jsonify({"recipes": recipe_list})
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
        
        new_recipe = Recipe(
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

    @jwt_required()
    def put(self, recipe_id):
        data = request.get_json()
        current_user_id = get_jwt_identity()
        recipe = Recipe.query.get_or_404(recipe_id)
        
        if recipe.user_id != current_user_id:
            return {"error": "Permission denied"}, 403
        
        recipe.title = data.get('title', recipe.title)
        recipe.description = data.get('description', recipe.description)
        recipe.ingredients = data.get('ingredients', recipe.ingredients)
        recipe.procedure = data.get('procedure', recipe.procedure)
        recipe.servings = data.get('servings', recipe.servings)
        recipe.cooking_time = data.get('cooking_time', recipe.cooking_time)
        recipe.difficulty_level = data.get('difficulty_level', recipe.difficulty_level)
        recipe.country = data.get('country', recipe.country)
        
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
        data = {
            'id': recipe.id,
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
            'updated_at': recipe.updated_at.isoformat() if recipe.updated_at else None
        }
        
        if include_details:
            data['comments'] = [self.format_comment(comment) for comment in recipe.comments]
            data['bookmark_count'] = Bookmark.query.filter_by(recipe_id=recipe.id).count()
        
        return data

    def format_comment(self, comment):
        return {
            'id': comment.id,
            'content': comment.content,
            'user_id': comment.user_id,
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

    def format_recipe(self, recipe):
        return {
            'id': recipe.id,
            'title': recipe.title,
            'description': recipe.description,
            'cooking_time': recipe.cooking_time,
            'difficulty_level': recipe.difficulty_level,
            'country': recipe.country,
        }

# Add these resources to your API
api.add_resource(UserProfile, '/profile')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(RefreshToken, '/refresh')
api.add_resource(RecipeResource, '/recipes', '/recipes/<int:recipe_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
