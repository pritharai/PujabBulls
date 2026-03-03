import Blog from "../models/Blog.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import { extractPublicIdsFromContent } from "../utils/extractPublicIds.js";

// Create a blog
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, status, coverImage, thumbnailImage } =
      req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    let baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      status,
      coverImage,
      thumbnailImage,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
// Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    // Extact strong search
    //     if (search) {
    //   filter.$text = { $search: search };
    // }

    const totalBlogs = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs,
      blogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// Get a single Blog by identifier
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOneAndUpdate(
      { slug, status: "published" }, // Only allow published blogs publicly
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, status, coverImage, thumbnailImage } =
      req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 🔹 Handle Cover Image Replacement
    if (coverImage && blog.coverImage?.public_id) {
      await cloudinary.uploader.destroy(blog.coverImage.public_id);
      blog.coverImage = coverImage;
    }

    // 🔹 Handle Thumbnail Replacement
    if (thumbnailImage && blog.thumbnailImage?.public_id) {
      await cloudinary.uploader.destroy(blog.thumbnailImage.public_id);
      blog.thumbnailImage = thumbnailImage;
    }

    // 🔹 Handle Slug Update if Title Changes
    if (title && title !== blog.title) {
      let baseSlug = slugify(title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;

      while (await Blog.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      blog.slug = slug;
      blog.title = title;
    }

    // 🔹 Handle Inline Image Cleanup (IMPORTANT)
    if (content) {
      const oldPublicIds = extractPublicIdsFromContent(blog.content);
      const newPublicIds = extractPublicIdsFromContent(content);

      const removedImages = oldPublicIds.filter(
        (id) => !newPublicIds.includes(id),
      );

      for (const publicId of removedImages) {
        await cloudinary.uploader.destroy(publicId);
      }

      blog.content = content;
    }

    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (status !== undefined) blog.status = status;

    await blog.save();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
// delete a blog

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete cover image
    if (blog.coverImage?.public_id) {
      await cloudinary.uploader.destroy(blog.coverImage.public_id);
    }

    // Delete thumbnail image
    if (blog.thumbnailImage?.public_id) {
      await cloudinary.uploader.destroy(blog.thumbnailImage.public_id);
    }

    // Extract inline images
    const inlinePublicIds = extractPublicIdsFromContent(blog.content);

    // Delete inline images
    for (const publicId of inlinePublicIds) {
      await cloudinary.uploader.destroy(publicId);
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog and all images deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
