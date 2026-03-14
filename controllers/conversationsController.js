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
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
        messages: true,
      },
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (req, res, next) => {
  try {
    const { participant1, participant2 } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        participants: [participant1, participant2],
      },
    });

    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

export const getConversationById = async (req, res, next) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: Number(req.params.id),
        participants: {
          some: { id: req.user.id },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
        messages: true,
      },
    });

    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const sendMessage = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
