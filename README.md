# Virgool Simulation Backend
Overview
This repository contains the simulation backend for the Virgool website, built using TypeScript, Nest.js, JWT, and PostgreSQL. The backend provides a robust set of features for user management, blog creation and management, and social interactions.

# Features
OTP Verification: Secure user registration and login with one-time password verification
User Profile: View and edit user profiles, including profile pictures and bio information
User Settings: Allow users to customize their account settings, such as notification preferences
Notifications: Send notifications to users for important events, such as new comments or likes on their blogs
Favorite List: Allow users to save and manage their favorite blogs
Image Management: Upload, store, and serve images for blog posts and user profiles
Blog Creation and Editing: Create, edit, and manage blog posts with advanced formatting options
Advanced Search: Search for blogs by keyword, category, and author
Comment Management: Create, edit, and delete comments on blog posts
Like and Bookmark Blogs: Allow users to like and bookmark their favorite blogs
Suggest Blogs: Provide personalized blog recommendations to users based on their interests
Technical Details
Programming Language: TypeScript
Framework: Nest.js
Authentication: JSON Web Tokens (JWT)
Database: PostgreSQL
# Getting Started
Clone the repository: git clone https://github.com/abolfazlrezazadeh/virgool-backend.git
Install dependencies: npm install or yarn install
Create a PostgreSQL database and update the database section in config.json
Run the application: npm run start or yarn start
Use a tool like Postman or cURL to test the API endpoints
# API Endpoints
# User Endpoints:
POST /users: Create a new user
GET /users/{id}: Get a user by ID
PUT /users/{id}: Update a user
DELETE /users/{id}: Delete a user
# Blog Endpoints:
POST /blogs: Create a new blog post
GET /blogs: Get a list of blog posts
GET /blogs/{id}: Get a blog post by ID
PUT /blogs/{id}: Update a blog post
DELETE /blogs/{id}: Delete a blog post
# Comment Endpoints:
POST /comments: Create a new comment
GET /comments: Get a list of comments
GET /comments/{id}: Get a comment by ID
PUT /comments/{id}: Update a comment
DELETE /comments/{id}: Delete a comment
# Contributing
Contributions are welcome! Please submit a pull request with a clear description of the changes you've made.

I hope this helps! Let me know if you need any further modifications.
