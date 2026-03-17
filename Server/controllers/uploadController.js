import { writeAuditLog } from "../utils/auditLogger.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      await writeAuditLog({
        level: "warn",
        domain: "blog-image",
        eventType: "upload_missing_file",
        req,
      });

      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    await writeAuditLog({
      domain: "blog-image",
      eventType: "upload_success",
      req,
      asset: {
        publicId: req.file.filename,
        url: req.file.path,
        folder: "blog_images",
      },
      details: {
        mimeType: req.file.mimetype,
        bytes: req.file.size,
      },
    });

    res.status(200).json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename
    });

  } catch (err) {
    await writeAuditLog({
      level: "error",
      domain: "blog-image",
      eventType: "upload_failed",
      req,
      details: {
        error: err.message,
      },
    });

    res.status(500).json({
      success: false,
      message: "Upload failed"
    });
  }
};


export const uploadEditorImage = async (req, res) => {
  try {
    if (!req.file) {
      await writeAuditLog({
        level: "warn",
        domain: "blog-image",
        eventType: "editor_upload_missing_file",
        req,
      });

      return res.status(400).json({
        success: 0
      });
    }

    await writeAuditLog({
      domain: "blog-image",
      eventType: "editor_upload_success",
      req,
      asset: {
        publicId: req.file.filename,
        url: req.file.path,
        folder: "blog_images",
      },
      details: {
        mimeType: req.file.mimetype,
        bytes: req.file.size,
      },
    });

    res.status(200).json({
      success: 1,
      file: {
        url: req.file.path,
        public_id: req.file.filename
      }
    });

  } catch (err) {
    await writeAuditLog({
      level: "error",
      domain: "blog-image",
      eventType: "editor_upload_failed",
      req,
      details: {
        error: err.message,
      },
    });

    res.status(500).json({
      success: 0
    });
  }
};
