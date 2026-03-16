import { prisma } from "../lib/prisma.js";

const userSelect = {
  id: true,
  username: true,
  displayName: true,
  bio: true,
  online: true,
};

export async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({ select: userSelect });
    return res.json(users);
  } catch (error) {
    return next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: userSelect,
    });

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

export async function getUserByUsername(req, res, next) {
  const { username } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
      select: userSelect,
    });

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

export async function updateUser(req, res, next) {
  const userId = Number(req.params.id);

  if (req.user.id !== userId) {
    return next({ status: 403, message: "Forbidden" });
  }

  try {
    const { displayName, bio, online } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        displayName: displayName,
        bio: bio,
        online: online,
      },
      select: userSelect,
    });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(req, res, next) {
  const userId = Number(req.params.id);

  if (req.user.id !== userId) {
    return next({ status: 403, message: "Forbidden" });
  }

  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
      select: userSelect,
    });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
