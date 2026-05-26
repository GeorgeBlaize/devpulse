import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    console.log(" Received Authorization Header:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access - No token provided"
      });
    }

   
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      console.log("Token after removing Bearer prefix");
    }

    console.log("Final Token being verified:", token.substring(0, 30) + "...");

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET as string
    ) as {
      id: number;
      name: string;
      role: string;
    };

    console.log("Token Verified Successfully! User:", decoded.name, "| Role:", decoded.role);

    req.user = decoded;
    next();
  } catch (error: any) {
    console.error("JWT Verify Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};