import { Router } from "express";
import ChatController from '../controllers/chat.controller';
const router = Router();
const {
    getChatDetails,
    generateScriptTag
} = new ChatController();

router.put("/", getChatDetails);
router.get("/script-tag", generateScriptTag);

export default router;