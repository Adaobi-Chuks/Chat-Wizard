"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const doc_routes_1 = __importDefault(require("./doc.routes"));
const chat_routes_1 = __importDefault(require("./chat.routes"));
const constants_config_1 = require("../configs/constants.config");
exports.default = (app) => {
    app.use(`${constants_config_1.basePath}/users`, user_routes_1.default);
    app.use(`${constants_config_1.basePath}/chats`, chat_routes_1.default);
    app.use(`${constants_config_1.basePath}/docs`, doc_routes_1.default);
};
