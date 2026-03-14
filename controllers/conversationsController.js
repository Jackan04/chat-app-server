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

export const sendMessage = async (req, res, next) => {
  try {
    const { content, conversationId } = req.body;

    const message = await prisma.message.create({
      data: {
        content: content,
        senderId: req.user.id,
        conversationId: conversationId,
      },
    });

    res.json({ message });
  } catch (error) {
    next(error);
  }
};
