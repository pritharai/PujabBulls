import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import { writeAuditLog } from "./auditLogger.js";

function buildReferenceQuery(publicId, excludeBlogId) {
  const query = {
    $or: [
      { "coverImage.public_id": publicId },
      { "thumbnailImage.public_id": publicId },
      { "gallery.public_id": publicId },
      { "content.blocks.data.file.public_id": publicId },
    ],
  };

  if (excludeBlogId) {
    query._id = { $ne: excludeBlogId };
  }

  return query;
}

export async function findReferencingBlog(publicId, excludeBlogId) {
  if (!publicId) {
    return null;
  }

  const query = Blog.findOne(buildReferenceQuery(publicId, excludeBlogId));

  if (typeof query?.select === "function") {
    return query.select("_id slug title").lean();
  }

  return query;
}

export async function destroyCloudinaryAssets(
  publicIds = [],
  { req, reason, blogId } = {},
) {
  for (const publicId of publicIds.filter(Boolean)) {
    const referencedBy = await findReferencingBlog(publicId, blogId);

    if (referencedBy) {
      await writeAuditLog({
        level: "warn",
        domain: "blog-image",
        eventType: "cloudinary_delete_skipped_shared_reference",
        req,
        blog: {
          id: blogId || null,
        },
        asset: {
          publicId,
        },
        details: {
          reason,
          referencedBy,
        },
      });
      continue;
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId);

      await writeAuditLog({
        domain: "blog-image",
        eventType: "cloudinary_delete_result",
        req,
        blog: {
          id: blogId || null,
        },
        asset: {
          publicId,
        },
        details: {
          reason,
          cloudinaryResult: result,
        },
      });
    } catch (error) {
      await writeAuditLog({
        level: "error",
        domain: "blog-image",
        eventType: "cloudinary_delete_failed",
        req,
        blog: {
          id: blogId || null,
        },
        asset: {
          publicId,
        },
        details: {
          reason,
          error: error.message,
        },
      });
    }
  }
}
