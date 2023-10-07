import { MAXAGE, SECRET } from "../configs/constants.config";
import IUser, {IUserWithId} from "../interfaces/user.interface";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export default class UserService {
    async find(email: string) {
        return await User.findOne({ email: email }, "-__v");
    }

    async create(user: Partial<IUser>) {
        const _user = await User.create(user);
        return await User.findOne({ _id: _user.id}, "-__v -password");
    }

    async findById(id: string) {
        return await User.findOne({ _id: id }, "-__v -password");
    }

    async findAllById(id: string) {
        return await User.findOne({ _id: id}, "-__v -password");
    }

    async getAllUsers() {
        let filter: any = {};
        //sorts in descending order based on the date created
        return await User.find(filter, "-__v -password").sort({ createdAt: 'desc' });
    }

    async editById(id: string, obj: Partial<IUser>) {
        if(await User.findOne({ _id: id })){
            return await User.findByIdAndUpdate(id, { $set: obj }, { new: true }).select("-password");
        }
    }

    generateAuthToken (user: IUserWithId) {
        return jwt.sign({
          id: user.id,
          email: user.email
        }, "secret", {
          expiresIn: MAXAGE
        });
      }

}