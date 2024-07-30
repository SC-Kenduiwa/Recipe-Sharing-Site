import unittest
import pytest
from server.app import app, db, User

@pytest.fixture(scope='module')
def test_client():
    flask_app = app

    testing_client = flask_app.test_client()

    # Establish an application context before running the tests.
    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client  # this is where the testing happens!

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    # Create the database and the database table(s)
    db.create_all()

    # Insert user data
    user1 = User(username='testuser1')
    user2 = User(username='testuser2')
    db.session.add(user1)
    db.session.add(user2)

    # Commit the changes for the users
    db.session.commit()

    yield db  # this is where the testing happens!

    db.drop_all()

def test_create_user(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/users' endpoint is posted to (POST request)
    THEN check if the response is valid
    """
    response = test_client.post('/users', json={'username': 'newuser'})
    assert response.status_code == 201
    assert b'newuser' in response.data

def test_get_users(test_client, init_database):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/users' endpoint is requested (GET request)
    THEN check if the response is valid
    """
    response = test_client.get('/users')
    assert response.status_code == 200
    assert b'testuser1' in response.data
    assert b'testuser2' in response.data

class TestUserRoutes(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_create_user(self):
        response = self.app.post('/users', json={'username': 'unittestuser'})
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'unittestuser', response.data)

    def test_get_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'unittestuser', response.data)

if __name__ == "__main__":
    unittest.main()
