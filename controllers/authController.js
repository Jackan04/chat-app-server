import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { signToken } from "../lib/jwt.js";
import { validationResult } from "express-validator";

export const register = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      next({
        status: 400,
        message: "Validation failed",
        errors: validationErrors.array(),
      });
    }

    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: passwordHash,
      },
    });

    const token = signToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      next({
        status: 400,
        message: "Validation failed",
        errors: validationErrors.array(),
      });
    }

    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  const { password, ...user } = req.user;
  res.json(user);
};
