"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const constants_config_1 = require("./constants.config");
function database() {
    mongoose_1.default.connect("mongodb+srv://admin:0Tro4fOEPlowPzX5@cluster0.ffzsabi.mongodb.net/")
        .then(() => {
        console.log(constants_config_1.MESSAGES.DATABASE.CONNECTED);
    })
        .catch((err) => {
        console.log(constants_config_1.MESSAGES.DATABASE.ERROR, err);
    });
}
exports.default = database;
