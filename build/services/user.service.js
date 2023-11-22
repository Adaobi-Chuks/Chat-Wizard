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
const constants_config_1 = require("../configs/constants.config");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ email: email }, "-__v");
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield user_model_1.default.create(user);
            return yield user_model_1.default.findOne({ _id: _user.id }, "-__v -password");
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ _id: id }, "-__v -password");
        });
    }
    findAllById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ _id: id }, "-__v -password");
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            //sorts in descending order based on the date created
            return yield user_model_1.default.find(filter, "-__v -password").sort({ createdAt: 'desc' });
        });
    }
    editById(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield user_model_1.default.findOne({ _id: id })) {
                return yield user_model_1.default.findByIdAndUpdate(id, { $set: obj }, { new: true }).select("-password");
            }
        });
    }
    generateAuthToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email
        }, "secret", {
            expiresIn: constants_config_1.MAXAGE
        });
    }
}
exports.default = UserService;
