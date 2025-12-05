import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import channelRoutes from "./src/routes/channelRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import { supabaseAuth } from "./src/middleware/supabaseAuth.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://anytime-chat.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());

app.use("/auth", authRoutes);
// Protected routes
app.use("/channels", supabaseAuth, channelRoutes);
app.use("/messages", supabaseAuth, messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
