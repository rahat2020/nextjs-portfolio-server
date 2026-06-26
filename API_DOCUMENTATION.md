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

## 2. About Module
Manage the portfolio owner's personal and social profile information.

> **Singleton Resource** — Only **one** About Info document exists at a time. There is no `:id` in the URL; all operations target the single document.

### Get About Info
- **URL**: `/about`
- **Method**: `GET`
- **Public**: Yes
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "About info retrieved successfully",
    "data": {
      "_id": "...",
      "full_name": "Rahat Ahmed",
      "short_name": "Rahat",
      "job_title": "Full Stack Developer",
      "avatar": "https://res.cloudinary.com/.../avatar.jpg",
      "resume_url": "https://example.com/resume.pdf",
      "email": "rahat@example.com",
      "phone": "+880 1700 000000",
      "location": "Dhaka, Bangladesh",
      "header_title": "Hi, I'm Rahat 👋",
      "header_description": "A passionate full-stack developer...",
      "about_title": "About Me",
      "about_description": "I build modern web applications...",
      "linkedin_title": "Connect with me on LinkedIn",
      "linkedin_link": "https://linkedin.com/in/rahat",
      "facebook_link": "https://facebook.com/rahat",
      "twitter_link": "https://twitter.com/rahat",
      "instagram_link": "https://instagram.com/rahat",
      "whatsapp_link": "https://wa.me/8801700000000",
      "github_link": "https://github.com/rahat",
      "youtube_link": "",
      "website_link": "https://rahat.dev",
      "years_of_experience": 3,
      "projects_completed": 20,
      "open_to_work": true,
      "skills": ["React", "Node.js", "MongoDB"],
      "meta_title": "Rahat Ahmed — Full Stack Developer",
      "meta_description": "Portfolio of Rahat Ahmed, a full-stack developer...",
      "createdAt": "2026-06-26T16:00:00.000Z",
      "updatedAt": "2026-06-26T16:00:00.000Z"
    }
  }
  ```

### Create About Info (Admin Only)
- **URL**: `/about`
- **Method**: `POST`
- **Auth Required**: Yes
- **Note**: Returns `409 Conflict` if an About Info document already exists. Use `PATCH` to update instead.
- **Body**:
  ```json
  {
    "full_name": "Rahat Ahmed",
    "short_name": "Rahat",
    "job_title": "Full Stack Developer",
    "avatar": "https://res.cloudinary.com/.../avatar.jpg",
    "resume_url": "https://example.com/resume.pdf",
    "email": "rahat@example.com",
    "phone": "+880 1700 000000",
    "location": "Dhaka, Bangladesh",
    "header_title": "Hi, I'm Rahat 👋",
    "header_description": "A passionate full-stack developer...",
    "about_title": "About Me",
    "about_description": "I build modern web applications...",
    "linkedin_title": "Connect with me on LinkedIn",
    "linkedin_link": "https://linkedin.com/in/rahat",
    "facebook_link": "https://facebook.com/rahat",
    "twitter_link": "https://twitter.com/rahat",
    "instagram_link": "https://instagram.com/rahat",
    "whatsapp_link": "https://wa.me/8801700000000",
    "github_link": "https://github.com/rahat",
    "youtube_link": "",
    "website_link": "https://rahat.dev",
    "years_of_experience": 3,
    "projects_completed": 20,
    "open_to_work": true,
    "skills": ["React", "Node.js", "MongoDB"],
    "meta_title": "Rahat Ahmed — Full Stack Developer",
    "meta_description": "Portfolio of Rahat Ahmed..."
  }
  ```

### Update About Info — Partial (Admin Only)
- **URL**: `/about`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**: Any subset of the fields above. Only the fields you send will be updated.
  ```json
  {
    "job_title": "Senior Full Stack Developer",
    "open_to_work": false,
    "skills": ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"]
  }
  ```

### Replace About Info — Full (Admin Only)
- **URL**: `/about`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Body**: Same as the `POST` body above. All fields will be overwritten.

### Delete About Info (Admin Only)
- **URL**: `/about`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "About info deleted successfully",
    "data": null
  }
  ```

#### About Info — Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `full_name` | String | ✅ Yes | Full display name |
| `short_name` | String | No | Nickname / short name |
| `job_title` | String | No | Professional title |
| `avatar` | URL String | No | Profile photo URL (upload via `/uploads` first) |
| `resume_url` | URL String | No | Link to downloadable resume/CV |
| `email` | Email String | No | Contact email address |
| `phone` | String | No | Contact phone number |
| `location` | String | No | City/Country |
| `header_title` | String | No | Hero section headline |
| `header_description` | String | No | Hero section sub-text |
| `about_title` | String | No | About section heading |
| `about_description` | String | No | About section body text |
| `linkedin_title` | String | No | Label text for the LinkedIn link |
| `linkedin_link` | URL String | No | LinkedIn profile URL |
| `facebook_link` | URL String | No | Facebook profile URL |
| `twitter_link` | URL String | No | Twitter/X profile URL |
| `instagram_link` | URL String | No | Instagram profile URL |
| `whatsapp_link` | URL String | No | WhatsApp chat link |
| `github_link` | URL String | No | GitHub profile URL |
| `youtube_link` | URL String | No | YouTube channel URL |
| `website_link` | URL String | No | Personal website URL |
| `years_of_experience` | Number | No | Total years of experience |
| `projects_completed` | Number | No | Count of completed projects |
| `open_to_work` | Boolean | No | Whether currently available for hire |
| `skills` | String[] | No | List of skill/technology names |
| `meta_title` | String | No | SEO page title |
| `meta_description` | String | No | SEO meta description |

---

## 3. Project Module
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

## 4. Experience Module
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

## 5. Post Module
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

## 6. Upload Module
Upload an image to Cloudinary and get back its URL. Use this URL as the `thumbnail`, `avatar`, or `resume_url` value when creating/updating any resource — this endpoint does **not** create any database record itself.

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

## 7. Notification Module
Read and manage system notifications generated by admin actions (create/update/delete on any resource).

> Notifications are created automatically by the server — you cannot manually POST a notification.

- **Get All Notifications**: `GET /notifications` (Auth Required)
- **Mark as Read**: `PATCH /notifications/:id/read` (Auth Required)
- **Delete Notification**: `DELETE /notifications/:id` (Auth Required)

---

## Error Response Format
All errors follow a consistent format:
```json
{
  "success": false,
  "message": "A human-readable error message",
  "errors": [ ... ]
}
```

| HTTP Status | Meaning |
|---|---|
| `400` | Bad Request — validation failed |
| `401` | Unauthorized — missing or invalid token |
| `403` | Forbidden — insufficient permissions |
| `404` | Not Found — resource does not exist |
| `409` | Conflict — resource already exists (e.g. creating About Info twice) |
| `500` | Internal Server Error |

---

## Postman Collection
You can import the `postman_collection.json` file provided in this repository directly into Postman or Insomnia.
