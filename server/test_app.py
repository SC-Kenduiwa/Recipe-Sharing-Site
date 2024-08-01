import unittest
import pytest
from datetime import datetime
from server.app import app, db, User

@pytest.fixture(scope='module')
def test_client():
    flask_app = app
    testing_client = flask_app.test_client()
    ctx = flask_app.app_context()
    ctx.push()
    yield testing_client
    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    db.create_all()
    user1 = User(
        username='testuser1',
        email='testuser1@example.com',
        password_hash='password_hash1',
        profile_image_url='default.png', 
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(user1)
    db.session.commit()
    yield db
    db.drop_all()

def test_create_user(test_client, init_database):
    response = test_client.post('/users', json={
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password_hash': 'newpasswordhash',
        'profile_image_url': 'newuser.png'  # Include if required
    })
    assert response.status_code == 201
    assert b'newuser' in response.data

def test_login(test_client, init_database):
    response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    assert response.status_code == 200
    assert 'access_token' in response.json
    assert 'refresh_token' in response.json

def test_refresh_token(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    refresh_token = login_response.json['refresh_token']
    response = test_client.post('/refresh', json={
        'refresh_token': refresh_token
    })
    assert response.status_code == 200
    assert 'access_token' in response.json

def test_view_profile(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.get('/profile', headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 200
    assert b'testuser1' in response.data

def test_update_profile(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.put('/profile', json={
        'username': 'updateduser1',
        'profile_image_url': 'updated.png'
    }, headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 200
    assert b'updateduser1' in response.data

def test_view_all_recipes(test_client, init_database):
    response = test_client.get('/recipes')
    assert response.status_code == 200

def test_view_single_recipe(test_client, init_database):
    response = test_client.get('/recipes/1')
    assert response.status_code == 200

def test_search_recipes(test_client, init_database):
    response = test_client.get('/recipes?search=pasta')
    assert response.status_code == 200

def test_filter_recipes(test_client, init_database):
    response = test_client.get('/recipes?country=Italy&rating=5&ingredients=tomato&servings=4&createdDateTime=2023-01-01')
    assert response.status_code == 200

def test_create_recipe(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.post('/recipes', json={
        'title': 'New Recipe',
        'description': 'Delicious new recipe'
    }, headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 201
    assert b'New Recipe' in response.data

def test_update_recipe(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.put('/recipes/1', json={
        'title': 'Updated Recipe',
        'description': 'Updated delicious recipe'
    }, headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 200
    assert b'Updated Recipe' in response.data

def test_delete_recipe(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.delete('/recipes/1', headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 204

def test_bookmark_recipe(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.post('/recipes/1/bookmark', headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 201

def test_view_bookmarked_recipes(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.get('/profile/bookmarks', headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 200

def test_add_comment(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.post('/recipes/1/comments', json={
        'content': 'Great recipe!'
    }, headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 201

def test_rate_recipe(test_client, init_database):
    login_response = test_client.post('/login', json={
        'email': 'testuser1@example.com',
        'password': 'password_hash1'
    })
    access_token = login_response.json['access_token']
    response = test_client.post('/recipes/1/ratings', json={
        'rating': 5
    }, headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert response.status_code == 201

if __name__ == "__main__":
    unittest.main()
