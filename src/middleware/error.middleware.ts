import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err); 

  
  return sendResponse(
    res,
    500,
    false,
    "Internal Server Error",
    null,
    err.message || "Something went wrong"
  );
};