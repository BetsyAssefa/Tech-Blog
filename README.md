# Tech-Blog

## Description
The **Tech Blog** is a CMS-style blog site built to allow developers to publish articles, blog posts, and their thoughts and opinions. This project follows the **Model-View-Controller (MVC)** paradigm, utilizing **Sequelize** for the database, **Handlebars.js** for the templating engine, and **Express.js** for the server.

Users can sign up, log in, create blog posts, comment on other developers' posts, and manage their posts through an interactive dashboard.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Screenshots](#screenshots)


## Installation
Follow these steps to install and run the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/<Your-GitHub-Username>/Tech-Blog.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Tech-Blog
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   - Ensure PostgreSQL is running.
   - Create the database using the following command:
     ```bash
     psql -U postgres -c "CREATE DATABASE tech_blog_db;"
     ```
5. Configure the environment variables:
   - Create a `.env` file in the root directory and include:
     ```plaintext
     DB_NAME=tech_blog_db
     DB_USER=postgres
     DB_PASSWORD=<your_password>
     DB_HOST=localhost
     DB_PORT=5432
     ```
6. Seed the database (optional):
   ```bash
   npm run seed
   ```
7. Start the application:
   ```bash
   npm start
   ```

## Usage
- Visit the application in your browser at `http://localhost:3001`.
- Sign up or log in to create blog posts.
- Comment on other developers' posts.
- Manage your posts via the dashboard.

## Features
- User authentication (sign up, log in, and log out).
- Ability to create, edit, and delete blog posts.
- Leave comments on other users' posts.
- Interactive dashboard for managing your posts.
- Secure password storage with **bcrypt**.
- Session management using **express-session**.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **Handlebars.js**: Templating engine for dynamic views.
- **Sequelize**: ORM for PostgreSQL.
- **PostgreSQL**: Relational database.
- **bcrypt**: Password hashing for secure authentication.
- **dotenv**: Environment variable management.

## License
This project is licensed under the MIT License.

<<<<<<< HEAD
-   Email: bitsietassefa5@gmail.com
=======
Email: bitsietassefa5@gmail.com
>>>>>>> 4d3928d2bda061d4493cba0b1d4d87fa903675ee
