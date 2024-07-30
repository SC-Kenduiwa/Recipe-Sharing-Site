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
import cloudinary.api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.secret_key = b"\xa4\x82\x9fs\xf2\x81\xa4'&\xfd\xf1\x07\xe2\x1b>\xc7"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

cloudinary.config(
    cloud_name='dsmof3lkd',
    api_key='831315369772392',
    api_secret='jVk2IKptlQh_u4eS2q1BAP-VCvI'
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
