import { prisma } from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  
};

export const deleteUser = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
