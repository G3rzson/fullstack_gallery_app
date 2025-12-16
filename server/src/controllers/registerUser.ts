import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerFormSchema } from "../zodSchemas/registerFormSchema";
import { RegisterUserModel } from "../db/models/registerUser.model";

export async function registerUser(req: Request, res: Response) {
  try {
    const validatedData = registerFormSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error!",
      });
    }

    const existingUser = await RegisterUserModel.findOne({
      $or: [
        { username: validatedData.data.username },
        { email: validatedData.data.email },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

    await RegisterUserModel.create({
      username: validatedData.data.username,
      email: validatedData.data.email,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
}
