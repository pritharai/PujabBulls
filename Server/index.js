import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===============================
   MIDDLEWARES
================================ */

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());

/* ===============================
   ROUTES
================================ */

app.get('/', (req,res) => {
    return res.status(200).json({success:true})
})

app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("📩 CONTACT FORM SUBMISSION:");
    console.log({ name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message received successfully!",
    });

  } catch (err) {
    console.error("❌ Contact route error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ===============================
   SERVER START
================================ */

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
