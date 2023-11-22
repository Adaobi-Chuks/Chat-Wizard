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
const mongoose_1 = require("mongoose");
const constants_config_1 = require("../configs/constants.config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    }
}, {
    timestamps: true
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password") || this.isNew) {
            const salt = yield bcrypt_1.default.genSalt(constants_config_1.SALTROUNDS);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
        }
        next();
    });
});
userSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        let passwordHash;
        //Only hash the password when the password field is to be updated to avoid rehashing already hashed password
        if (update.$set.password) {
            const salt = yield bcrypt_1.default.genSalt(constants_config_1.SALTROUNDS);
            passwordHash = yield bcrypt_1.default.hash(update.$set.password, salt);
        }
        //this.Query() is used to get the argument and it's type passed in in the method that triggers this function
        const prevDetails = yield this.model.findOne(this.getQuery());
        const { email } = prevDetails;
        //get the email from the body or from the already saved user details
        let _email;
        if (update.$set.email) {
            _email = update.$set.email;
        }
        else {
            _email = email;
        }
        update.$set.password = passwordHash;
        update.$set.updatedAt = new Date();
        next();
    });
});
const User = (0, mongoose_1.model)(constants_config_1.DATABASES.USER, userSchema);
exports.default = User;
