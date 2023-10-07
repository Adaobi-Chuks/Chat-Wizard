import { Router } from "express";
import UserController from '../controllers/user.controller';
const router = Router();
const {
    createUser,
    login
} = new UserController();

//create a user or signup
router.post("/", createUser);
//login a user
router.post("/login", login);

export default router;