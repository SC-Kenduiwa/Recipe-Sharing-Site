from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from datetime import timedelta
import cloudinary.api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.secret_key = b"\xa4\x82\x9fs\xf2\x81\xa4'&\xfd\xf1\x07\xe2\x1b>\xc7"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=36500)  # Set expiration to 100 years

CORS(app)

cloudinary.config(
    cloud_name='dmze7emzl',
    api_key='879125659435828',
    api_secret='EP7n75hw2qvKo05IaAJv40RiW0o'
)

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
db.init_app(app)

migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
api = Api(app)
jwt = JWTManager(app)
