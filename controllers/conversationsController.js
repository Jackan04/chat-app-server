import { prisma } from "../lib/prisma.js";

export async function getConversations(req, res, next) {
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

    return res.json(conversations);
  } catch (error) {
    return next(error);
  }
}

export async function createConversation(req, res, next) {
  try {
    const { participant1, participant2 } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: participant1 }, { id: participant2 }],
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
      },
    });

    return res.status(201).json(conversation);
  } catch (error) {
    return next(error);
  }
}

export async function getConversationById(req, res, next) {
  try {
    const conversation = await prisma.conversation.findFirst({
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

    if (!conversation) {
      return next({ status: 404, message: "Conversation not found" });
    }

    return res.json(conversation);
  } catch (error) {
    return next(error);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { content } = req.body;
    const conversationId = req.params.id;

    const message = await prisma.message.create({
      data: {
        content: content,
        senderId: req.user.id,
        conversationId: conversationId,
      },
    });

    return res.status(201).json({ message });
  } catch (error) {
    return next(error);
  }
}
