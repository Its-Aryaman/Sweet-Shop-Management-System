import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./DB/DB.js";
import authRoutes from "./routes/auth.js";
import sweetsRoutes from "./routes/sweets.js";

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sweet Shop Backend API");
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));