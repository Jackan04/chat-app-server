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
  try {
    const { displayName, bio, online } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
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
  try {
    const user = await prisma.user.delete({
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

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
