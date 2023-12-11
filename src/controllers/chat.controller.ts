import { Request, Response } from "express";
import axios from "axios";

export default class chatController {
    async getChatDetails(req: Request, res: Response) {
        try {
            const chatEngineResponse = await axios.put(
                'https://api.chatengine.io/users/',
                {
                    username: req.body.userEmail,
                    secret: "secret",
                },
                {
                    headers: {
                    'PRIVATE-KEY': '6a082680-ab6f-4722-84c0-e07120a9662d',
                    },
                }
            );
            console.log('ChatEngine user created: ', chatEngineResponse.data);
        } catch (err) {
            console.error('Error creating ChatEngine user:');
        }
        let chatEngineData = null;
        try {
            const chatEngineResponse = await axios.put(
                'https://api.chatengine.io/chats/',
                {
                    usernames: [req.body.userEmail, req.body.adminEmail],
                    title: "Chat Wizard",
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

    async generateScriptTag(req: Request, res: Response) {
        const script = `
            (function () {
                var script = document.createElement('script');
                script.src = 'https://chat-wizard.vercel.app/api/v1//src/utils/addChatTool.utils.js?userEmail=${req.query.adminEmail}';
                document.head.appendChild(script);
            })();
        `;
        return res.status(200).send({
            success: true,
            message: "Script generated successfully",
            scriptTag: script
        });
    }
}