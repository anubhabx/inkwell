import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { connectDatabase } from "./database/connect.database.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
  connectDatabase(process.env.MONGODB_URI);
  console.log(`Server is running on port ${PORT}`);
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// Serve static assets in production
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

// Error handling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server error";
  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
  });
});
