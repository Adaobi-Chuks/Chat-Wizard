"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errors_middleware_1 = __importDefault(require("./errors.middleware"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const database_config_1 = __importDefault(require("../configs/database.config"));
const dotenv_1 = __importDefault(require("dotenv"));
(0, database_config_1.default)();
dotenv_1.default.config();
exports.default = (app) => {
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)());
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_1.urlencoded)());
    app.use(errors_middleware_1.default);
    (0, index_routes_1.default)(app);
};
