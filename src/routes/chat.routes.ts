import { Router } from "express";
import ChatController from '../controllers/chat.controller';
const router = Router();
const {
    getChatDetails
} = new ChatController();

router.put("/", getChatDetails);

export default router;