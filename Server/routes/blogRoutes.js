import express from "express";
import { createBlog,getBlogs,getBlogBySlug,updateBlog,deleteBlog } from "../controllers/blogController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
    
    // create a blog
    router.post("/", protectAdmin ,createBlog);

    // get all blogs 
    router.get("/", getBlogs);

    // Get blog by Slug
    router.get("/:slug", getBlogBySlug);

    // Update a blog
    router.put("/:id",  protectAdmin ,updateBlog);

    // Delete a blog
    router.delete("/:id",  protectAdmin ,deleteBlog);

export default router;