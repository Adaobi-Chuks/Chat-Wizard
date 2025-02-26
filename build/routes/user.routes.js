"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
const { createUser, login, getAuthenticatedUser } = new user_controller_1.default();
//create a user or signup
router.post("/", createUser);
router.get("/", getAuthenticatedUser);
//login a user
router.post("/login", login);
//get chatid
router.post("/chat", login);
exports.default = router;
