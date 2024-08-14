# RecipeConnect

## Project Overview

RecipeConnect is a web application that allows users to find and share simple, accessible recipes. It caters to middle-class and lower-class homes/restaurants, providing an easy-to-use platform for discovering and sharing culinary ideas.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Cloning the Repository](#cloning-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

### Key Features

- User authentication (login/signup)
- Profile management
- Recipe browsing and searching
- Recipe filtering
- CRUD operations for recipes
- Recipe bookmarking
- Social media sharing
- Responsive design for mobile compatibility

## Tech Stack

- Frontend: React, Redux Toolkit
- Backend: Flask (Python)
- Database: SQLAlchemy
- Testing: Jest (Frontend), Minitests (Backend)
- Dependency Management: pipenv (Python), npm (JavaScript)
- Image Storage: Cloudinary

## Prerequisites

Before you begin, ensure you have the following installed:
- Python (3.7+)
- Node.js (14+)
- pip
- pipenv
- Git

## Setup Instructions

### Cloning the Repository

1. Open your terminal and run:
```
git clone git@github.com:SC-Kenduiwa/Recipe-Sharing-Site.git
```

### Backend Setup

1. Navigate to the backend directory:
```
cd server
```
2. Install Python dependencies using pipenv:
```
pipenv install
```
3. Activate the virtual environment:
```
pipenv shell
```
4. Set up environment variables:
- Create a `.env` file in the backend directory
- Add necessary environment variables (e.g., DATABASE_URL, SECRET_KEY, CLOUDINARY_URL)

5. Seed the database:
   ```
   python seed.py
   ```
6. Run the Flask development server:
   ```
   python app.py
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd client
   ```
2. Install JavaScript dependencies:
   ```
   npm  install
   ```
3. Start the React development server:
   ```
   npm start
   ```
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) 

## Acknowledgments

- Cloudinary for image storage solutions
- React and Redux communities for excellent documentation
- Flask and SQLAlchemy for robust backend support

## Future Enhancements

- Android application development
- User following feature with notifications
- Enhanced recipe recommendation system

## Contributors
- [Shanice Kenduiwa](https://github.com/SC-Kenduiwa)
- [Justin Mwangi](https://github.com/14justin)
- [Bridget Muchesia](https://github.com/VenusBridget)
- [Emmanuel Otieno](https://github.com/0097eo)
- [Abdishakur Aden](https://github.com/Abdishakur-aden)

For any additional information or queries, please open an issue in the GitHub repository.
   

