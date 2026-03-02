import Blog from "../models/Blog.js";
import slugify from "slugify";

// Create a blog
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
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
      status
    });

    res.status(201).json({ success: true, blog });

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
        { excerpt: { $regex: search, $options: "i" } }
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
      blogs
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

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      blog
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// update a blog 
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, status } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

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

    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (status) blog.status = status;

    await blog.save();

    res.status(200).json({
      success: true,
      blog
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted"
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};