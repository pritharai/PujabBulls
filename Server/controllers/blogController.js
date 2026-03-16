import Blog from "../models/Blog.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import {
  buildImageUpdatePlan,
  collectReferencedImagePublicIds,
} from "../utils/blogImageLifecycle.js";

async function destroyCloudinaryAssets(publicIds = []) {
  for (const publicId of publicIds) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error(`Failed to delete Cloudinary asset: ${publicId}`, error);
    }
  }
}

// Create a blog
export const createBlog = async (req, res) => {
  const { title, excerpt, content, status, coverImage, thumbnailImage } =
    req.body;
  const uploadedImageIds = collectReferencedImagePublicIds({
    coverImage,
    thumbnailImage,
    content,
  });

  try {
    if (!title || !content) {
      await destroyCloudinaryAssets(uploadedImageIds);
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const baseSlug = slugify(title, { lower: true, strict: true });
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
    await destroyCloudinaryAssets(uploadedImageIds);
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

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

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
      { slug, status: "published" },
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

// Update a blog
export const updateBlog = async (req, res) => {
  let cleanupOnFailure = [];

  try {
    const { id } = req.params;
    const { title, excerpt, content, status, coverImage, thumbnailImage } =
      req.body;
    const uploadedImageIds = collectReferencedImagePublicIds({
      coverImage,
      thumbnailImage,
      content,
    });

    const blog = await Blog.findById(id);

    if (!blog) {
      await destroyCloudinaryAssets(uploadedImageIds);
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const { updates, deleteAfterSave, cleanupOnFailure: pendingCleanup } =
      buildImageUpdatePlan({
        currentBlog: blog,
        nextCoverImage: coverImage,
        nextThumbnailImage: thumbnailImage,
        nextContent: content,
      });

    cleanupOnFailure = pendingCleanup;

    if (updates.coverImage) {
      blog.coverImage = updates.coverImage;
    }

    if (updates.thumbnailImage) {
      blog.thumbnailImage = updates.thumbnailImage;
    }

    if (title && title !== blog.title) {
      const baseSlug = slugify(title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;

      while (await Blog.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      blog.slug = slug;
      blog.title = title;
    }

    if (updates.content) {
      blog.content = updates.content;
    }

    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (status !== undefined) blog.status = status;

    await blog.save();

    res.status(200).json({
      success: true,
      blog,
    });

    await destroyCloudinaryAssets(deleteAfterSave);
  } catch (err) {
    console.error(err);
    await destroyCloudinaryAssets(cleanupOnFailure);
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

    const assetIds = collectReferencedImagePublicIds({
      coverImage: blog.coverImage,
      thumbnailImage: blog.thumbnailImage,
      content: blog.content,
    });

    await blog.deleteOne();
    await destroyCloudinaryAssets(assetIds);

    res.status(200).json({
      success: true,
      message: "Blog and all images deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// Get Blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

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
};
