import { Request, Response } from "express";
import axios from "axios";

export default class chatController {
    async getChatDetails(req: Request, res: Response) {
        let chatEngineData = null;
        try {
            const chatEngineResponse = await axios.put(
                'https://api.chatengine.io/chats/',
                {
                    usernames: [req.body.adminEmail],
                    title: req.body.userEmail,
                    is_direct_chat: false
                },
                {
                    headers: {
                    'Project-ID': '9fc5ff33-97af-4fac-ae05-264e99afb765',
                    'User-Name': req.body.userEmail,
                    'User-Secret': 'secret'
                    },
                }
            );
            console.log('ChatEngine chat created or retrived: ', chatEngineResponse.data);
            chatEngineData = chatEngineResponse.data;
        } catch (err) {
            console.error('Error creating ChatEngine user:');
        }
        return res.status(200).send({
            success: true,
            message: "Chat Id fetched successfully",
            chatId: chatEngineData.id,
            accessKey: chatEngineData.access_key
        });
    }
}