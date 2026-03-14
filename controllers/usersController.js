import { prisma } from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
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

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  const { displayName, bio, online } = req.body;

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      displayName: displayName,
      bio: bio,
      online: online,
    },
  });

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json(user);
};
