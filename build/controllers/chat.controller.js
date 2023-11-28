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
const axios_1 = __importDefault(require("axios"));
class chatController {
    getChatDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let chatEngineData = null;
            try {
                const chatEngineResponse = yield axios_1.default.put('https://api.chatengine.io/chats/', {
                    usernames: [req.body.adminEmail],
                    title: req.body.userEmail,
                    is_direct_chat: false
                }, {
                    headers: {
                        'Project-ID': '9fc5ff33-97af-4fac-ae05-264e99afb765',
                        'User-Name': req.body.userEmail,
                        'User-Secret': 'secret'
                    },
                });
                console.log('ChatEngine chat created or retrived: ', chatEngineResponse.data);
                chatEngineData = chatEngineResponse.data;
            }
            catch (err) {
                console.error('Error creating ChatEngine user:');
            }
            return res.status(200).send({
                success: true,
                message: "Chat Id fetched successfully",
                chatId: chatEngineData.id
            });
        });
    }
}
exports.default = chatController;
