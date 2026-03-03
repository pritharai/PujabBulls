import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { uploadEditorImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", protectAdmin, upload.single("image"), uploadImage);

router.post(
  "/editor",
  protectAdmin,
  upload.single("image"),
  uploadEditorImage
);

export default router;