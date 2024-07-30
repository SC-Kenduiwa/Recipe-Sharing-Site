from faker import Faker
import random
from cloudinary.utils import cloudinary_url
from cloudinary.uploader import upload
from config import app, db
from models import User, Recipe, Comment, Rating, Bookmark

fake = Faker()

SAMPLE_IMAGE_IDS = ["http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4", "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4", "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4", "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4"]

def generate_image_url():
    sample_id = random.choice(SAMPLE_IMAGE_IDS)
    result = upload(sample_id)
    url, _ = cloudinary_url(sample_id, width=300, height=300, crop="fill")
    return url

def seed_data():
    with app.app_context():
        print("Clearing existing data...")
        db.drop_all()
        db.create_all()

        print("Seeding users...")
        users = []
        for _ in range(45):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                profile_image_url=generate_image_url(),
                password=fake.password()
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        print("Seeding recipes...")
        recipes = []
        for _ in range(50):
            recipe = Recipe(
                title=fake.sentence(nb_words=4),
                description=fake.paragraph(),
                ingredients=fake.words(nb=10),
                procedure="\n".join([f"Step {i+1}. {fake.sentence()}" for i in range(5)]),
                servings=random.randint(2, 8),
                cooking_time=random.randint(15, 120),
                difficulty_level=random.choice(["Easy", "Medium", "Hard"]),
                country=fake.country(),
                user_id=random.choice(users).id
            )
            recipes.append(recipe)
        db.session.add_all(recipes)
        db.session.commit()

        print("Seeding comments...")
        comments = []
        for _ in range(100):
            comment = Comment(
                content=fake.paragraph(),
                user_id=random.choice(users).id,
                recipe_id=random.choice(recipes).id
            )
            comments.append(comment)
        db.session.add_all(comments)
        db.session.commit()

        print("Seeding ratings...")
        ratings = []
        for _ in range(200):
            rating = Rating(
                value=random.randint(1, 5),
                user_id=random.choice(users).id,
                recipe_id=random.choice(recipes).id
            )
            ratings.append(rating)
        db.session.add_all(ratings)
        db.session.commit()

        print("Seeding bookmarks...")
        bookmarks = []
        for _ in range(75):
            bookmark = Bookmark(
                user_id=random.choice(users).id,
                recipe_id=random.choice(recipes).id
            )
            bookmarks.append(bookmark)
        db.session.add_all(bookmarks)
        db.session.commit()

        print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_data()
