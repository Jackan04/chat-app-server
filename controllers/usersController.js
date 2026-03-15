import { prisma } from "../lib/prisma.js";

export async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        online: true,
      },
    });
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
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        online: true,
      },
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
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        online: true,
      },
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
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        online: true,
      },
    });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
