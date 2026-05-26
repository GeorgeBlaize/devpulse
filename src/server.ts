import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { initDB } from "./db";   // ← Import here

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initDB();                    // ← Initialize tables
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();