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

def test_get_users(test_client, init_database):
    response = test_client.get('/users')
    assert response.status_code == 200
    assert b'testuser1' in response.data

class TestUserRoutes(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_create_user(self):
        response = self.app.post('/users', json={
            'username': 'unittestuser',
            'email': 'unittestuser@example.com',
            'password_hash': 'unittestpasswordhash',
            'profile_image_url': 'unittestuser.png'  # Include if required
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'unittestuser', response.data)

    def test_get_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'unittestuser', response.data)

if __name__ == "__main__":
    unittest.main()
