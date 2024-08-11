# RECIPE-SHARING-SITE

# Table of Contents

1. Introduction
2. Problem Statement
3. Solution
4. Future Considerations
5. Team
6. Minimum Viable Product (MVP)
7. Technical Expectations
8. Setup and Installation
9. Usage
10. Testing
11. Contributing
12. License
13. Contact

 # Introduction
Finding the right recipe online can be a hassle, especially when most available recipes are for high-end meals that may not be feasible in a middle-class to lower-class home or restaurant. Our application aims to solve this problem by providing a platform where users can find and share simple recipes.

 # Problem Statement
Most online recipe platforms focus on high-end meals, making it difficult for users from middle-class or lower-class backgrounds to find feasible recipes. This creates a need for an application that offers simple and accessible recipes.

 # Solution
Our application allows users to find and share simple recipes online. Each recipe includes ingredients, procedures, and the number of people served. Registered users can also comment, bookmark, and rate recipes.

 # Future Considerations
Convert the application into an Android app.
Allow users to follow each other and receive notifications when users they follow post new recipes.

 # Team
Full Stack Development: React (Frontend) & Flask Python (Backend)

 # Minimum Viable Product (MVP)
1. Login
2. Create an account
3. View and update profile (profile images saved on Cloudinary)
4. View and search recipes (by name, ingredients, and number of people served)
5. Filter recipes by country, ratings, ingredients, number of people served, and create date and time
6. Create, update, and delete recipes
7. Bookmark/favorite recipes
8. Share recipes on social media (Facebook, Twitter, and WhatsApp)
9. Sign out
   
 # Technical Expectations
1. Backend: Flask Python
2. Database: SQLAlchemy
3. Wireframes: Figma (Mobile-friendly)
4. Testing Framework: Jest & Minitests
5. Frontend: ReactJS & Redux Toolkit (State management)


## Setup and Installation
Prerequisites
Ensure that the following software is installed on your system:

1.Node.js (with npm)
2.Python
3.Flask
4.SQLAlchemy
5.A Cloudinary account (for managing profile images)

## Backend Setup
Clone the Repository:
git clone https://github.com/yourusername/recipe-sharing-platform.git
cd recipe-sharing-platform/server

## Create and Activate a Virtual Environment:
python -m venv venv
source venv/bin/activate 

## Configure Environment Variables:
Set up environment variables required by Flask and Cloudinary.

export FLASK_APP=app.py
export FLASK_ENV=development
export CLOUDINARY_URL=your_cloudinary_url

## Run the Backend Server:
python app.py


## Frontend Setup
Navigate to the Frontend Directory:

cd client

## Install Frontend Dependencies:

npm install

## Start the Frontend Development Server:

npm start


## Contributing to the Project
We welcome contributions to this project. To contribute, please follow the steps below:

Fork the repository.
Create a new branch for your feature or bugfix (git checkout -b feature/your-feature).
Implement your changes.
Commit your changes with descriptive messages (git commit -m 'Add feature: your-feature').
Push your branch to your fork (git push origin feature/your-feature).
Open a pull request to the main repository.
Licensing Information
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact Information
For inquiries, feedback, or support, please contact us at support@recipeplatform.com.