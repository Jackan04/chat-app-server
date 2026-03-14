import { prisma } from "../lib/prisma.js";

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { id: req.user.id },
        },
      },
      include: {
        participants: {
          id: true,
          username: true,
          displayName: true,
        },
        messages: true,
      },
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const getConversationById = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const getMessages = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const sendMessage = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
