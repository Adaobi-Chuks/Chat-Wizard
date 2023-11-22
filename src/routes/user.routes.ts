import { Router } from "express";
import UserController from '../controllers/user.controller';
const router = Router();
const {
    createUser,
    login,
    getUserById
} = new UserController();

//create a user or signup
router.post("/", createUser);
router.get("/", getUserById);
//login a user
router.post("/login", login);

export default router;