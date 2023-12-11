
# Whismy Words - Blog Web App

## Overview

Whismy Words is a full-stack Blog web application built with Next.js (TypeScript) and CSS for the frontend, Node.js, Express, and MongoDB for the backend. The web app provides comprehensive CRUD functionality. Additionally, it supports secure authentication with JWT.

## Tech Stack

- **Frontend:**
  - Next.js (TypeScript)
  - CSS

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Database)

- **Authentication:**
  - JWT (JSON Web Tokens)

## Features

- **User Authentication:**
  - Secure authentication using JWT (JSON Web Tokens) using email and password
  
- **Email Verification:**
  - Users receive a verification email upon signup to confirm their email address.
  - Users can click on a verification link sent to their email to complete the email verification process.
 
- **Password Management:**
  - A password reset email is sent to the user's registered email address.
  - Users can securely reset their password by following the instructions in the reset email.

- **Blog Post Management:**
  - Users can browse and view all blog posts available on the platform.
  - Users can apply filters to search for specific posts based on categories or keywords.
  - The application supports pagination for an organized and user-friendly post browsing experience.

- **Authenticated User Actions:**
  - Authenticated users have the ability to create new blog posts, update their own blog posts or delete it. 
  - Authenticated users have the ability to update their own profile or delete it. 

- **Authenticated User Actions:**
 - Admins can see a comprehensive list of all registered users, comments, tags, and posts.
 - Admins can delete users, posts, comments, and categories.

## Project Structure

The root project has `client` and `api` folders. 

- **Client:** Frontend Next application.

- **API:** Backend Node.js and Express application.

## Setup
- **Clone the Repository:**
	- git clone git@github.com:ahmedwagih96/whismy-words.git

- **Install Backend Dependencies and run the server:**
	- npm install.
	- npm run dev

- **Install Frontend Dependencies and run the server:**
	- cd client 
    - npm install
	- npm run dev 

## Local Environment Setup

- **Frontend:**
Create a `.env` file in the `client` folder with the following content:
- NEXT_PUBLIC_NEXTAUTH_SECRET = YOUR_RANDOM_NEXTAUTH_SECRET
- NEXT_PUBLIC_URL = YOUR_BACKEND_DOMAIN
- **Backend:**
 Create a `.env` file in the `root` folder with the following content:
- MONGODB_URI= YOUR_MONGODB_URI
- JWT_SECRET= YOUR_JWT_SECRET
- APP__EMAIL_ADDRESS = YOUR_GMAIL_ADDRESS
- APP_EMAIL_PASSWORD = YOUR_GMAL_APP_PASSWORD
- CLOUDINARY_CLOUD_NAME = YOUR_CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY = YOUR_CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET = YOUR_CLOUDINARY_API_SECRET
- CLIENT_DOMAIN = YOUR_CLIENT_DOMAIN
