"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URI = exports.DATABASES = exports.SALTROUNDS = exports.MESSAGES = exports.basePath = exports.MAXAGE = exports.SECRET = exports.PORT = void 0;
const DATABASE_URI = process.env.DATABASE_URI;
exports.DATABASE_URI = DATABASE_URI;
const PORT = process.env.PORT || 9871;
exports.PORT = PORT;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;
const SALTROUNDS = 10;
exports.SALTROUNDS = SALTROUNDS;
const MAXAGE = 3 * 24 * 60 * 60;
exports.MAXAGE = MAXAGE;
const basePath = "/api/v1";
exports.basePath = basePath;
const DATABASES = {
    USER: "user"
};
exports.DATABASES = DATABASES;
const MESSAGES = {
    DATABASE: {
        CONNECTED: "Connection to database has been established successfully",
        ERROR: "Unable to connect to database:"
    },
    USER: {
        CREATED: "User created successfully.",
        DUPLICATE_EMAIL: "Email already exist.",
        DUPLICATE_PHONENUMBER: "Phonenumber already exist.",
        DUPLICATE_IMAGE: "Image already belongs to a registered user.",
        FETCHEDALL: "All available users fetched successfully",
        INVALID_ID: "User ID does not exist.",
        FETCHED: "User fetched successfully",
        UPDATED: "User updated successfully.",
        DELETED: "User deleted successfully",
        INVALID_EMAIL: "Email does not exist.",
        INVALID_PASSWORD: "Incorrect password.",
        LOGGEDIN: "Successfully logged in",
        LOGGEDOUT: "Successfully logged out"
    },
    // AUTH: {
    //     TOKENERROR: 'Access Denied: Token not provided',
    //     INVALIDTOKEN: 'Access Denied: Invalid token',
    //     DENIED: 'Access Denied: Unauthorized request'
    // },
};
exports.MESSAGES = MESSAGES;
