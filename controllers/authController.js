import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { signToken } from "../lib/jwt.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      password: passwordHash,
    },
  });

  const token = signToken(user.id);
  res.send(201).json({ token });
};

export const login = async (req, res) => {
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
};

export const getMe = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
