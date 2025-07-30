import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import startupRoutes from "./routes/startup.js";
import applicationRoutes from "./routes/intern.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/startups", startupRoutes);
app.use("/applications", applicationRoutes);


const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection failed:", err.message));

  