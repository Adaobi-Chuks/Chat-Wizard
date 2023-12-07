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
                        'Project-ID': '30a0ab26-3bce-4bce-a5f6-523ba1ba2256',
                        'User-Name': req.body.userEmail,
                        'User-Secret': 'secret',
                        "Content-Type": "application/json",
                        Vary: "Accept, Origin",
                        Allow: "GET, POST, PUT, HEAD, OPTIONS",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        "X-Cloud-Trace-Context": "356f99312aac3a16d462aed40bced7fa",     
                        'referrer-policy': 'no-referrer'   
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
            chatId: String(chatEngineData.id),
            accessKey: chatEngineData.access_key
        });
    }
}