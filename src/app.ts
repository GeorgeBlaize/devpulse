import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import issueRoutes from "./modules/issues/issue.routes";
import { errorHandler } from "./middleware/error.middleware";   // ← Add this

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
  res.send("DevPulse API is Running.");
});


app.use(errorHandler);

export default app;