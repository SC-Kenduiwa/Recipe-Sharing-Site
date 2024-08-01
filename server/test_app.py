import unittest
from datetime import datetime
from app import app, db, User, Recipe, Comment, Rating, Bookmark
from config import app as flask_app
import json

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = flask_app.test_client()
        self.app.testing = True
        
        with flask_app.app_context():
            db.create_all()
            
            test_user = User(
                username='testuser',
                email='testuser@example.com',
                profile_image_url='http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
            )
            test_user.password = 'testpassword'
            db.session.add(test_user)
            db.session.commit()

    def tearDown(self):
        with flask_app.app_context():
            db.session.remove()
            db.drop_all()

    def get_auth_headers(self):
        login_response = self.app.post('/login', json={
            'username': 'testuser',
            'password': 'testpassword'
        })
        access_token = json.loads(login_response.data)['access_token']
        return {'Authorization': f'Bearer {access_token}'}

    def test_signup(self):
        response = self.app.post('/users', json={
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpassword',
            'profile_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        })
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('access_token', data)
        self.assertIn('refresh_token', data)

    def test_login(self):
        response = self.app.post('/login', json={
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        self.assertIn('refresh_token', data)

    def test_refresh_token(self):
        login_response = self.app.post('/login', json={
            'username': 'testuser',
            'password': 'testpassword'
        })
        refresh_token = json.loads(login_response.data)['refresh_token']
        response = self.app.post('/refresh', headers={'Authorization': f'Bearer {refresh_token}'})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)

    def test_get_user_profile(self):
        headers = self.get_auth_headers()
        response = self.app.get('/profile', headers=headers)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('user', data)
        self.assertEqual(data['user']['username'], 'testuser')

    def test_create_recipe(self):
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        response = self.app.post('/recipes', json=recipe_data, headers=headers)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertIn('recipe', data)

    def test_get_recipes(self):
        response = self.app.get('/recipes')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('recipes', data)

    def test_get_single_recipe(self):
        # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Now get the recipe
        response = self.app.get(f'/recipes/{recipe_id}')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('recipe', data)

    def test_get_recipes_with_search_query(self):
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Searchable Recipe',
            'description': 'A test recipe for searching',
            'ingredients': json.dumps(['search_ingredient']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Search Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        self.app.post('/recipes', json=recipe_data, headers=headers)
        response = self.app.get('/recipes?search=Searchable')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('recipes', data)
        self.assertGreater(len(data['recipes']), 0)


    def test_update_recipe(self):
        # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Now update the recipe
        update_data = {'title': 'Updated Recipe Title'}
        response = self.app.put(f'/recipes/{recipe_id}', json=update_data, headers=headers)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['recipe']['title'], 'Updated Recipe Title')

    def test_delete_recipe(self):
        # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Now delete the recipe
        response = self.app.delete(f'/recipes/{recipe_id}', headers=headers)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('message', data)

    def test_create_comment(self):
        # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Now create a comment
        comment_data = {'content': 'Test comment'}
        response = self.app.post(f'/recipes/{recipe_id}/comments', json=comment_data, headers=headers)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('comment', data)


    def test_update_comment(self):
        # First create a recipe and a comment
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        comment_data = {'content': 'Test comment'}
        comment_response = self.app.post(f'/recipes/{recipe_id}/comments', json=comment_data, headers=headers)
        comment_id = json.loads(comment_response.data)['comment']['id']

        # Now update the comment
        updated_comment_data = {'content': 'Updated comment'}
        response = self.app.put(f'/recipes/{recipe_id}/comments/{comment_id}', json=updated_comment_data, headers=headers)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['comment']['content'], 'Updated comment')

    def test_delete_comment(self):
        # First, create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe for Comment Deletion',
            'description': 'A test recipe for deleting a comment',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Then, create a comment
        comment_data = {'content': 'Test comment for deletion'}
        create_comment_response = self.app.post(f'/recipes/{recipe_id}/comments', json=comment_data, headers=headers)
        self.assertEqual(create_comment_response.status_code, 201)
        comment_id = json.loads(create_comment_response.data)['comment']['id']

        # Now, delete the comment
        delete_response = self.app.delete(f'/recipes/{recipe_id}/comments/{comment_id}', headers=headers)
        self.assertEqual(delete_response.status_code, 200)
        data = json.loads(delete_response.data)
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Comment deleted successfully')

        # Verify the comment is deleted by attempting to retrieve it
        get_comment_response = self.app.get(f'/recipes/{recipe_id}/comments/{comment_id}', headers=headers)
        self.assertEqual(get_comment_response.status_code, 404)


    def test_create_rating(self):
        # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Now create a rating
        rating_data = {'value': 5}
        response = self.app.post(f'/recipes/{recipe_id}/ratings', json=rating_data, headers=headers)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('rating', data)

    def test_delete_rating(self):
    # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe for Rating Deletion',
            'description': 'A test recipe for deleting a rating',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

    # Create a rating
        rating_data = {'value': 4}
        rating_response = self.app.post(f'/recipes/{recipe_id}/ratings', json=rating_data, headers=headers)
        self.assertEqual(rating_response.status_code, 201)
        rating_id = json.loads(rating_response.data)['rating']['id']

    # Delete the rating
        delete_response = self.app.delete(f'/recipes/{recipe_id}/ratings/{rating_id}', headers=headers)
        self.assertEqual(delete_response.status_code, 200)
        data = json.loads(delete_response.data)
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Rating deleted successfully')




    def test_create_bookmark(self):
        # First create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe',
            'description': 'A test recipe',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Now create a bookmark
        response = self.app.post(f'/recipes/{recipe_id}/bookmarks', headers=headers)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('bookmark', data)

    def test_delete_bookmark(self):
        # Create a recipe
        headers = self.get_auth_headers()
        recipe_data = {
            'title': 'Test Recipe for Bookmark Deletion',
            'description': 'A test recipe for deleting a bookmark',
            'ingredients': json.dumps(['ingredient1', 'ingredient2']),
            'procedure': 'Test procedure',
            'servings': 4,
            'cooking_time': 30,
            'difficulty_level': 'Easy',
            'country': 'Test Country',
            'recipe_image_url': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4'
        }
        create_response = self.app.post('/recipes', json=recipe_data, headers=headers)
        recipe_id = json.loads(create_response.data)['recipe']['id']

        # Create a bookmark
        bookmark_response = self.app.post(f'/recipes/{recipe_id}/bookmarks', headers=headers)
        self.assertEqual(bookmark_response.status_code, 201)
        bookmark_id = json.loads(bookmark_response.data)['bookmark']['id']

        # Delete the bookmark
        delete_response = self.app.delete(f'/recipes/{recipe_id}/bookmarks/{bookmark_id}', headers=headers)
        self.assertEqual(delete_response.status_code, 200)
        data = json.loads(delete_response.data)
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Bookmark deleted successfully')


if __name__ == '__main__':
    unittest.main()
