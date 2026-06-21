# NEXT Portfolio 2.0 - API Documentation

Welcome to the backend API documentation for NEXT Portfolio 2.0. This API is built with Node.js, Express, and MongoDB.

## Architecture Overview
The backend follows a modular **Controller-Service-Model** pattern:
- **Routes**: Define the API endpoints and map them to controllers.
- **Controllers**: Handle HTTP requests, call the appropriate services, and return responses.
- **Services**: Contain the core business logic and interact with the database via models.
- **Models**: Define the database schema (using Mongoose).
- **Validation**: Uses **Zod** to validate request bodies before they reach the controller.

---

## Base URL
The API base URL is: `http://localhost:5000/api/v1` (replace `localhost:5000` with your server environment address).

## Authentication
Some endpoints require authentication. Use the `/auth/login` endpoint to get a JWT token.
- **Header Name**: `Authorization`
- **Header Value**: `Bearer <your_token>`

---

## 1. Auth Module
Manage authentication and admin users.

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "yourpassword"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "data": {
      "user": { ... },
      "token": "jwt_token_here"
    }
  }
  ```

### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "yourpassword",
    "name": "Admin Name"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "jwt_token_here",
      "admin": {
        "id": "admin_id",
        "email": "admin@example.com",
        "name": "Admin Name"
      }
    }
  }
  ```

### Get Profile
- **URL**: `/auth/profile`
- **Method**: `GET`
- **Auth Required**: Yes

### Admin Management (Admin Only)
- **Get All Admins**: `GET /auth/admins` (Auth Required)
- **Get Admin by ID**: `GET /auth/admins/:id` (Auth Required)
- **Create Admin**: `POST /auth/admins` (Auth Required)
  - **Body**: `{ "email": "...", "password": "...", "name": "..." }`
- **Update Admin**: `PATCH /auth/admins/:id` (Auth Required)
  - **Body**: Partial updates allowed.
- **Delete Admin**: `DELETE /auth/admins/:id` (Auth Required)

---

## 2. Project Module
Manage portfolio projects.

### Get All Projects
- **URL**: `/projects`
- **Method**: `GET`
- **Public**: Yes

### Get Project by Slug
- **URL**: `/projects/:slug`
- **Method**: `GET`
- **Public**: Yes

### Create Project (Admin Only)
- **URL**: `/projects`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "title": "Project Title",
    "description": "Project Description",
    "thumbnail": "https://example.com/image.jpg",
    "liveUrl": "https://live-link.com",
    "githubUrl": "https://github.com/repo",
    "technologies": ["React", "Node.js"],
    "category": "web",
    "isFeatured": false,
    "isPublished": true
  }
  ```

### Update Project (Admin Only)
- **URL**: `/projects/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**: Partial updates allowed.

### Delete Project (Admin Only)
- **URL**: `/projects/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes

---

## 3. Experience Module
Manage work experience.

### Get All Experiences
- **URL**: `/experiences`
- **Method**: `GET`
- **Public**: Yes

### Get Experience by Slug
- **URL**: `/experiences/:slug`
- **Method**: `GET`
- **Public**: Yes

### Create Experience (Admin Only)
- **URL**: `/experiences`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "company": "Company Name",
    "position": "Job Role",
    "description": "Job description",
    "location": "City, Country",
    "startDate": "2023-01-01",
    "endDate": "2024-01-01",
    "isCurrentlyWorking": false,
    "technologies": ["AWS", "Docker"],
    "isPublished": true
  }
  ```

### Update Experience (Admin Only)
- **URL**: `/experiences/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**: Partial updates allowed.

### Delete Experience (Admin Only)
- **URL**: `/experiences/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes

---

## 4. Post Module
Manage blog posts.

### Get All Posts
- **URL**: `/posts`
- **Method**: `GET`
- **Public**: Yes

### Get Post by Slug
- **URL**: `/posts/:slug`
- **Method**: `GET`
- **Public**: Yes

### Create Post (Admin Only)
- **URL**: `/posts`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "title": "Blog Title",
    "content": "Blog content in HTML or Markdown",
    "thumbnail": "https://example.com/thumb.jpg",
    "tags": ["Coding", "Tech"],
    "category": "Web Development",
    "isPublished": true
  }
  ```

### Update Post (Admin Only)
- **URL**: `/posts/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**: Partial updates allowed.

### Delete Post (Admin Only)
- **URL**: `/posts/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes

---

## 5. Upload Module
Upload an image to Cloudinary and get back its URL. Use this URL as the `thumbnail` value when creating/updating a Project or Post — this endpoint does **not** create any database record itself.

### Upload Image (Admin Only)
- **URL**: `/uploads`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**: `multipart/form-data`
  - `file`: the image file (jpeg, png, webp, gif, svg — max 5MB)
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "Image uploaded successfully",
    "data": {
      "url": "https://res.cloudinary.com/.../image.jpg",
      "publicId": "portfolio/abcd1234"
    }
  }
  ```

---

## Postman Collection
You can import the `postman_collection.json` file provided in this repository directly into Postman or Insomnia.
