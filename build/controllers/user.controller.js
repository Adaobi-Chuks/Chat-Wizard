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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const { create, find, findById, generateAuthToken } = new user_service_1.default();
const { DUPLICATE_EMAIL, CREATED, INVALID_ID, INVALID_EMAIL, INVALID_PASSWORD, LOGGEDIN, } = constants_config_1.MESSAGES.USER;
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
                html: `<!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Support wizard</title>
                <style media="all" type="text/css">
                  /* -------------------------------------
                GLOBAL RESETS
            ------------------------------------- */
            
                  body {
                    font-family: Helvetica, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 16px;
                    line-height: 1.3;
                    color: #eaebed;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  }
            
                  table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                  }
            
                  table td {
                    font-family: Helvetica, sans-serif;
                    font-size: 16px;
                    vertical-align: top;
                  }
                  /* -------------------------------------
                BODY & CONTAINER
            ------------------------------------- */
            
                  body {
                    background-color: #27272a;
                    margin: 0;
                    padding: 0;
                  }
            
                  .body {
                    background-color: #27272a;
                    width: 100%;
                  }
            
                  .container {
                    margin: 0 auto !important;
                    max-width: 600px;
                    padding: 0;
                    padding-top: 24px;
                    width: 600px;
                  }
            
                  .content {
                    box-sizing: border-box;
                    display: block;
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 0;
                  }
                  /* -------------------------------------
                HEADER, FOOTER, MAIN
            ------------------------------------- */
            
                  .main {
                    background: #27272a;
                    border: 1px solid #eaebed;
                    border-radius: 16px;
                    width: 100%;
                  }
            
                  .wrapper {
                    box-sizing: border-box;
                    padding: 24px;
                  }
                  .image {
                    width: 100%;
                  }
                  .footer {
                    clear: both;
                    padding-top: 24px;
                    text-align: center;
                    width: 100%;
                  }
            
                  .footer td,
                  .footer p,
                  .footer span,
                  .footer a {
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                  }
                  /* -------------------------------------
                TYPOGRAPHY
            ------------------------------------- */
            
                  p {
                    font-family: Helvetica, sans-serif;
                    font-size: 16px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 16px;
                  }
            
                  a {
                    color: #0867ec;
                    text-decoration: underline;
                  }
                  /* -------------------------------------
                BUTTONS
            ------------------------------------- */
            
                  /* -------------------------------------
                OTHER STYLES THAT MIGHT BE USEFUL
            ------------------------------------- */
            
                  .last {
                    margin-bottom: 0;
                  }
            
                  .first {
                    margin-top: 0;
                  }
            
                  .align-center {
                    text-align: center;
                  }
            
                  .align-right {
                    text-align: right;
                  }
            
                  .align-left {
                    text-align: left;
                  }
            
                  .text-link {
                    color: #0867ec !important;
                    text-decoration: underline !important;
                  }
            
                  .clear {
                    clear: both;
                  }
            
                  .mt0 {
                    margin-top: 0;
                  }
            
                  .mb0 {
                    margin-bottom: 0;
                  }
            
                  .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0;
                  }
            
                  .powered-by a {
                    text-decoration: none;
                  }
            
                  /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            
                  @media only screen and (max-width: 640px) {
                    .main p,
                    .main td,
                    .main span {
                      font-size: 16px !important;
                    }
                    .wrapper {
                      padding: 8px !important;
                    }
                    .content {
                      padding: 0 !important;
                    }
                    .container {
                      padding: 0 !important;
                      padding-top: 8px !important;
                      width: 100% !important;
                    }
                    .main {
                      border-left-width: 0 !important;
                      border-radius: 0 !important;
                      border-right-width: 0 !important;
                    }
                  }
                  /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            
                  /* @media all {
                    .ExternalClass {
                      width: 100%;
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                      line-height: 100%;
                    }
                    .apple-link a {
                      color: inherit !important;
                      font-family: inherit !important;
                      font-size: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                      text-decoration: none !important;
                    }
                    #MessageViewBody a {
                      color: inherit;
                      text-decoration: none;
                      font-size: inherit;
                      font-family: inherit;
                      font-weight: inherit;
                      line-height: inherit;
                    }
                  } */
                </style>
              </head>
              <body>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="body"
                >
                  <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                      <div class="content">
                        <!-- START CENTERED WHITE CONTAINER -->
                        <span class="preheader">Support Wizard</span>
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="main"
                        >
                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td class="wrapper">
                              <h2>Greetings, Magical Support Seeker!</h2>
                              <img
                                class="image"
                                src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1702042796/WhatsApp_Image_2023-12-08_at_14.05.16_ilefaa.jpg"
                              />
            
                              <br />
                              <br />
                              <p>
                                Welcome to the Enchanted Realm of
                                <strong style="color: #8a88fb">Support Wizard</strong>
                                – where customer support meets magic! 🧙‍♂️ We are delighted to
                                have you on board, and we can't wait to embark on this
                                journey together.
                              </p>
                              <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="btn btn-primary"
                              >
                                <tbody>
                                  <tr>
                                    <td align="left">
                                      <table
                                        role="presentation"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                      ></table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <img
                                class="image"
                                src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1702034381/wiz_-_10_odi1eb.png"
                              />
            
                              <br />
                              <br />
                              <p>
                                We're confident that our platform will elevate your support
                                capabilities, and we're excited to have you on board! Should
                                you have any questions or need assistance, our support team
                                is here to help. Feel free to reach out to
                                [glorytechnologies.com].
                              </p>
                              <br />
                              <p>Cosmically Yours,</p>
                              <p>Support Odyssey Crew 🚀🌌</p>
                            </td>
                          </tr>
            
                          <!-- END MAIN CONTENT AREA -->
                        </table>
            
                        <!-- START FOOTER -->
                        <div class="footer">
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          ></table>
                        </div>
            
                        <!-- END FOOTER -->
            
                        <!-- END CENTERED WHITE CONTAINER -->
                      </div>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </body>
            </html>
            `
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
                        'PRIVATE-KEY': '0c103866-084a-4bec-a350-5b35c53cd40b',
                    },
                });
                console.log('ChatEngine user created');
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
    getAuthenticatedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let decodedToken;
            try {
                decodedToken = jsonwebtoken_1.default.verify(req.cookies.token, "secret");
            }
            catch (err) {
                res.status(500).send(err.message);
                return;
            }
            if (!decodedToken.hasOwnProperty("email")) {
                res.status(401).send("Invalid authentication credentials.");
                return;
            }
            const { email } = decodedToken;
            let user = yield user_model_1.default.find({ email });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: INVALID_ID
                });
            }
            const _email = user[0].email;
            console.log(_email);
            return res.status(200).send({
                success: true,
                message: "Email fetched successfully",
                email: _email
            });
        });
    }
}
exports.default = UserController;
