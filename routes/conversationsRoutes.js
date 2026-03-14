import { Router } from "express";
import {
  getConversations,
  createConversation,
  getConversationById,
  getMessages,
  sendMessage,
} from "../controllers/conversationsController.js";

const conversationsRouter = Router();

conversationsRouter.get("/", getConversations);
conversationsRouter.post("/", createConversation);
conversationsRouter.get("/:id", getConversationById);
conversationsRouter.get("/:id/messages", getMessages);
conversationsRouter.post("/:id/messages", sendMessage);

export default conversationsRouter;
