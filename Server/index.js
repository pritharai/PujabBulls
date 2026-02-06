import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   CORS (DEV + PROD SAFE)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://punjabbulls.com",
  "https://www.punjabbulls.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://punjabbulls.com",
        "https://www.punjabbulls.com",
      ];

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ THIS LINE FIXES 405
app.options("*", cors());

app.use(express.json());


// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, company } = req.body;

    // 🛡️ Honeypot spam protection
    if (company) {
      return res.status(200).json({ success: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.MY_EMAIL,
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message received and email sent!",
    });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
