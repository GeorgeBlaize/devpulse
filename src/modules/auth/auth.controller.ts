import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import { createUser, findUserByEmail } from "./auth.service";
import { generateToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/response";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, false, "All fields are required");
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, false, "User already exists");
    }

    const user = await createUser(name, email, password, role || "contributor");
    return sendResponse(res, StatusCodes.CREATED, true, "User registered successfully", user);
  } catch (error: any) {
    return sendResponse(res, 500, false, "Registration failed", null, error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return sendResponse(res, 401, false, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, "Invalid credentials");
    }

    const token = generateToken({ id: user.id, name: user.name, role: user.role });

    delete user.password;

    return sendResponse(res, 200, true, "Login successful", { token, user });
  } catch (error: any) {
    return sendResponse(res, 500, false, "Login failed", null, error.message);
  }
};