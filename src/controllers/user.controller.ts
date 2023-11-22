import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import UserService from "../services/user.service";
import IUser from "../interfaces/user.interface";
import { transporter } from "../configs/nodeMailer.config";
import axios from "axios";
const {
    create,
    find,
    findById,
    generateAuthToken
} = new UserService();
const {
    DUPLICATE_EMAIL,
    DUPLICATE_PHONENUMBER,
    CREATED,
    FETCHEDALL,
    INVALID_ID,
    FETCHED,
    UPDATED,
    DELETED,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    LOGGEDIN,
    LOGGEDOUT
} = MESSAGES.USER;

export default class UserController {
    async createUser(req: Request, res: Response) {
        const {email, password} = req.body;
        
        //checks if another user with email exists
        if (await find(email)) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_EMAIL
            });
        }

        //creates a user if the email doesn't exist
        const createdUser = await create(req.body);
        const token = generateAuthToken(createdUser as any);

        let mailOptions = {
            from: "Glory Technologies <chuksaginamada@gmail.com>",
            to: `${createdUser?.email}`,
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
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
            console.log("Error " + err);
            } else {
            console.log("Email sent successfully");
            }
        });
          
        let chatEngineData = null;
        try {
            const chatEngineResponse = await axios.put(
              'https://api.chatengine.io/users/',
              {
                username: email,
                secret: "secret",
              },
              {
                headers: {
                  'PRIVATE-KEY': '9abea2d4-0de8-459a-aeec-5f61052d9942',
                },
              }
            );
            console.log('ChatEngine user created: ', chatEngineResponse.data);
          
            // Store ChatEngine response data
            chatEngineData = chatEngineResponse.data;
        } catch (err) {
            console.error('Error creating ChatEngine user:');
        }
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.status(201)
            .send({
                Success: true,
                Message: CREATED,
                User: createdUser
            });
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const _user = await find(email);
        if (!_user) {
            return res.status(400)
                .send({ 
                    Success: false, 
                    Message: INVALID_EMAIL
                });
        }
        console.log(password, _user)
        const validPassword = await bcrypt.compare(password, _user.password);
        if (!validPassword) {
            return res.status(400)
                .send({ 
                    Success: false, 
                    Message: INVALID_PASSWORD
                });
        }
        const token = generateAuthToken(_user as unknown as IUser);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: MAXAGE * 1000
        });
        return res.status(200).send({
            Success: true,
            Message: LOGGEDIN,
            User: _user 
        });
    }

    async getUserById(req: Request, res: Response) {
        //checks if user exists
        const user = await findById(req.params.userId);
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
    }

}