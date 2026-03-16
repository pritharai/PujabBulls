import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import helmet from "helmet";
import morgan from 'morgan'
import rateLimit from "express-rate-limit";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors_origin = process.env.ORIGIN || "http://localhost:5173";

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// middleware
app.use(morgan('dev'));

app.use(
  cors({
    origin: cors_origin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }),
);

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use(express.json());

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  return res.status(200).json({ success: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    console.log("CONTACT FORM SUBMISSION:", { name, email, phone, message });

    if (!name || !email || !phone || !message) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}

const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(phone)) {
  return res.status(400).json({
    success: false,
    message: "Invalid contact number",
  });
}

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.MY_EMAIL],
      cc: [process.env.CC_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send notification email",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message received and email sent!",
      resendData: data,
    });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image must be 15MB or smaller",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || "Upload failed",
    });
  }

  if (err.message === "Only JPG, PNG, and WEBP images are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Server error",
  });
});


// Server Start
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
