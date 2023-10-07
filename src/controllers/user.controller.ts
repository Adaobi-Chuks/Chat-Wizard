import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import UserService from "../services/user.service";
import IUser from "../interfaces/user.interface";
const {
    create,
    find,
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
        const {email} = req.body;
        
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

}