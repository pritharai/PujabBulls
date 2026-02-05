// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Resend } from "resend";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const cors_origin = process.env.ORIGIN || "http://localhost:5173";

// // middleware
// app.use(cors({
//   origin: cors_origin,
//   methods: ["GET", "POST"],
// }));

// app.use(express.json());

// // Initialize Resend client
// const resend = new Resend(process.env.RESEND_API_KEY);

// app.get('/', (req, res) => {
//   return res.status(200).json({ success: true });
// });

// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     console.log("CONTACT FORM SUBMISSION:", { name, email, message });

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     console.log(req.body)
//     // Send email using Resend
//     const { data, error } = await resend.emails.send({
//       // from: process.env.RESEND_FROM_EMAIL,
//       // to: [process.env.MY_EMAIL],
//        from: "onboarding@resend.dev",
//   to: "delivered@resend.dev",
//       subject: `New Contact Form Submission from ${name}`,
//       html: `
//         <h2>New Contact Request</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong><br/>${message}</p>
//       `,
//     });

//     if (error) {
//       console.error("Resend email error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to send notification email",
//         error,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Message received and email sent!",
//       resendData: data,
//     });

//   } catch (err) {
//     console.error("Contact route error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });

// // Server Start
// app.listen(PORT, () => {
//   console.log(`Backend running at http://localhost:${PORT}`);
// });


// above resend setup

// Below nodemailer setup
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors_origin = process.env.ORIGIN || "http://localhost:5173";

// middleware
app.use(
  cors({
    origin: cors_origin,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ------------------------------------
// Nodemailer Transport Setup
// ------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP Server ready to send emails");
  }
});

// ------------------------------------

app.get("/", (req, res) => {
  return res.status(200).json({ success: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("CONTACT FORM SUBMISSION:", { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const mailOptions = {
      from: `"Website Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.MY_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message received and email sent!",
      messageId: info.messageId,
    });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
