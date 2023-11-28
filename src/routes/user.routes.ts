import { Router } from "express";
import UserController from '../controllers/user.controller';
const router = Router();
const {
    createUser,
    login,
    getAuthenticatedUser
} = new UserController();

//create a user or signup
router.post("/", createUser);
router.get("/", getAuthenticatedUser);
//login a user
router.post("/login", login);
//get chatid
router.post("/chat", login);

export default router;