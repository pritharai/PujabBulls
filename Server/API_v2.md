
# 📝 MERN Blog Backend API Documentation

This backend powers an admin-managed blog system built with Node.js, Express, MongoDB, JWT authentication, and Cloudinary for image storage.

---

# 🔐 Authentication

## 1️⃣ Admin Login

**POST** `/api/auth/login`

Authenticate admin and receive JWT token.

### Request Body
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

### Response
```json
{
  "success": true,
  "token": "JWT_TOKEN_HERE"
}
```

Use this token in all protected routes:

```
Authorization: Bearer JWT_TOKEN_HERE
```

---

# 🖼 Image Upload APIs

## 2️⃣ Upload Cover / Thumbnail Image

**POST** `/api/upload`  
🔒 Protected (Admin Only)

Upload a blog cover or thumbnail image.

### Headers
```
Authorization: Bearer JWT_TOKEN
```

### Body (form-data)
Key: `image` (File)

### Response
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "public_id": "blog_images/abc123"
}
```

Use the returned `url` and `public_id` when creating or updating a blog.

---

## 3️⃣ Upload Inline Image (Editor.js)

**POST** `/api/upload/editor`  
🔒 Protected (Admin Only)

Used automatically by Editor.js to upload inline images.

### Body (form-data)
Key: `image` (File)

### Response
```json
{
  "success": 1,
  "file": {
    "url": "https://res.cloudinary.com/..."
  }
}
```

Editor.js inserts this URL directly into blog content.

---

# 📝 Blog APIs

## 4️⃣ Create Blog

**POST** `/api/blogs`  
🔒 Protected (Admin Only)

Create a new blog post.

### Request Body
```json
{
  "title": "My Blog Title",
  "excerpt": "Short description",
  "content": {
    "blocks": [
      {
        "type": "paragraph",
        "data": {
          "text": "Hello world"
        }
      }
    ]
  },
  "status": "published",
  "coverImage": {
    "url": "CLOUDINARY_URL",
    "public_id": "blog_images/abc123"
  }
}
```

### What It Does
- Generates a unique slug
- Calculates reading time
- Sets initial views to 0
- Saves image references
- Supports draft or published status

---

## 5️⃣ Get All Blogs

**GET** `/api/blogs`

Public endpoint to fetch blogs with pagination and filtering.

### Query Parameters
- `page` (default: 1)
- `limit` (default: 10)
- `search` (search by title or excerpt)
- `status` (draft/published)

### Example
```
/api/blogs?page=1&limit=5&search=react&status=published
```

### Response
```json
{
  "success": true,
  "currentPage": 1,
  "totalPages": 3,
  "totalBlogs": 25,
  "blogs": []
}
```

---

## 6️⃣ Get Single Blog by Slug

**GET** `/api/blogs/:slug`

Fetch a published blog by slug.

### Example
```
/api/blogs/my-first-blog
```

### What It Does
- Returns blog data
- Automatically increments view count

---

## 7️⃣ Update Blog

**PUT** `/api/blogs/:id`  
🔒 Protected (Admin Only)

Update blog details.

### What It Supports
- Title update (slug auto-updates)
- Content update
- Cover/thumbnail replacement
- Inline image cleanup
- Status change (draft/published)

When images are removed during update:
- Old images are automatically deleted from Cloudinary

---

## 8️⃣ Delete Blog

**DELETE** `/api/blogs/:id`  
🔒 Protected (Admin Only)

Delete a blog permanently.

### What It Does
- Deletes blog from database
- Deletes cover image
- Deletes thumbnail image
- Deletes all inline images from Cloudinary

---

# 🚀 Features Included

- JWT Authentication (Admin only)
- Slug auto-generation with collision handling
- Pagination & search
- Draft & publish system
- View counter
- Reading time calculation
- Secure image upload
- Full image lifecycle management
- Rate limiting & security headers

---

# 📌 Notes

- Public users can only read published blogs.
- Only admin can create, update, delete, or upload images.
- All image storage handled via Cloudinary.
- Inline images are automatically cleaned up on update or delete.

---

# 🛠 Base URL

```
http://localhost:5000
```

---

Backend is production-ready and lifecycle-safe.
