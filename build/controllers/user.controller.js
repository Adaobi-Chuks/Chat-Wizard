"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_config_1 = require("../configs/constants.config");
const user_service_1 = __importDefault(require("../services/user.service"));
const nodeMailer_config_1 = require("../configs/nodeMailer.config");
const axios_1 = __importDefault(require("axios"));
const { create, find, findById, generateAuthToken } = new user_service_1.default();
const { DUPLICATE_EMAIL, DUPLICATE_PHONENUMBER, CREATED, FETCHEDALL, INVALID_ID, FETCHED, UPDATED, DELETED, INVALID_EMAIL, INVALID_PASSWORD, LOGGEDIN, LOGGEDOUT } = constants_config_1.MESSAGES.USER;
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            //checks if another user with email exists
            if (yield find(email)) {
                //sends an error if the email exists
                return res.status(409)
                    .send({
                    success: false,
                    message: DUPLICATE_EMAIL
                });
            }
            //creates a user if the email doesn't exist
            const createdUser = yield create(req.body);
            const token = generateAuthToken(createdUser);
            let mailOptions = {
                from: "Glory Technologies <chuksaginamada@gmail.com>",
                to: `${createdUser === null || createdUser === void 0 ? void 0 : createdUser.email}`,
                subject: "Welcome to Chat Wizerd",
                sender: "Glory Technologies",
                html: `<!doctype html>
            <html>
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              </head>
              <body style="font-family: sans-serif;">
                <div style="display: block; margin: auto; max-width: 600px;" class="main">
                  <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Dear user,</h1>
                  <p>We are excited to welcome you on Chat Wizard!</p>
                  <p>Thank you for choosing us to assist you in streamlining customer support and enhancing productivity. We're here to make your experience smooth and enjoyable.</p>
                  <p>We can't wait to see how you'll benefit from our chat wizard.</p>
                  <p>Best regards,</p>
                  <p>Glory Technologies.</p>
                </div>
              </body>
            </html>`
            };
            //   Send Mail Method
            nodeMailer_config_1.transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                }
                else {
                    console.log("Email sent successfully");
                }
            });
            let chatEngineData = null;
            try {
                const chatEngineResponse = yield axios_1.default.put('https://api.chatengine.io/users/', {
                    username: email,
                    secret: "secret",
                }, {
                    headers: {
                        'PRIVATE-KEY': '9abea2d4-0de8-459a-aeec-5f61052d9942',
                    },
                });
                console.log('ChatEngine user created: ', chatEngineResponse.data);
                // Store ChatEngine response data
                chatEngineData = chatEngineResponse.data;
            }
            catch (err) {
                console.error('Error creating ChatEngine user:');
            }
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: constants_config_1.MAXAGE * 1000
            });
            return res.status(201)
                .send({
                Success: true,
                Message: CREATED,
                User: createdUser
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const _user = yield find(email);
            if (!_user) {
                return res.status(400)
                    .send({
                    Success: false,
                    Message: INVALID_EMAIL
                });
            }
            console.log(password, _user);
            const validPassword = yield bcrypt_1.default.compare(password, _user.password);
            if (!validPassword) {
                return res.status(400)
                    .send({
                    Success: false,
                    Message: INVALID_PASSWORD
                });
            }
            const token = generateAuthToken(_user);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: constants_config_1.MAXAGE * 1000
            });
            return res.status(200).send({
                Success: true,
                Message: LOGGEDIN,
                User: _user
            });
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //checks if user exists
            const user = yield findById(req.params.userId);
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: INVALID_ID
                });
            }
            return res.status(200).send({
                success: true,
                message: FETCHED,
                returnedUser: user
            });
        });
    }
}
exports.default = UserController;
