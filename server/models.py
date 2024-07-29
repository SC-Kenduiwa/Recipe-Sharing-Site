from config import db, bcrypt
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    profile_image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    recipes = db.relationship('Recipe', back_populate='user', lazy=True)
    comments = db.relationship('Comment', back_populate='user', lazy=True)
    rating = db.relationship('Rating', back_populate='user', lazy=True)
    bookmark = db.relationship('Bookmark', back_populate='user', lazy=True)

    @property
    def password_hash(self):
        raise AttributeError('password_hash is not a readable attribute')
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.String(1000), nullable=False)
    procedure = db.Column(db.String(300), nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    cooking_time = db.Column(db.String(100), nullable=False)
    difficulty_level = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='recipes')
    comments = db.relationship('Comment', back_populate='recipe', lazy=True)
    rating = db.relationship('Rating', back_populate='recipe', lazy=True)
    bookmark = db.relationship('Bookmark', back_populate='recipe', lazy=True)
    

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')
    rating = db.relationship('Rating', back_populates='comments')
    bookmark = db.relationship('Bookmark', back_populates='comments')

class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates= 'rating')
    recipe = db.relationship('Recipe', back_populates= 'rating')
    comment = db.relationship('Comment', back_populates= 'rating')
    bookmark = db.relationship('Bookmark', back_populates= 'rating')

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates= 'bookmark')
    recipe = db.relationship('Recipe', back_populates= 'bookmark')
    comment = db.relationship('Comment', back_populates= 'bookmark')
    rating = db.relationship('Rating', back_populates= 'bookmark')