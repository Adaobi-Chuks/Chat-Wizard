function initializeChatTool() {
    // Fetch the user's email from the query parameter
    const userEmail = '${userEmail}';

    // Check if the user is logged in and has an email
    if (userEmail) {
        // Placeholder: Add your chat tool logic here
        // For example, you might initialize a chat widget or perform other actions based on the user's email
        console.log("User is logged in with email:", userEmail);

        // Create a chat widget container
        const chatWidgetContainer = document.createElement('div');
        chatWidgetContainer.id = 'chat-widget-container';

        // Style the chat widget container (replace with your actual CSS)
        chatWidgetContainer.style.position = 'fixed';
        chatWidgetContainer.style.bottom = '20px';
        chatWidgetContainer.style.right = '20px';
        chatWidgetContainer.style.width = '300px';
        chatWidgetContainer.style.height = '400px';
        chatWidgetContainer.style.backgroundColor = '#fff';
        chatWidgetContainer.style.border = '1px solid #ccc';
        chatWidgetContainer.style.borderRadius = '5px';
        chatWidgetContainer.style.overflow = 'hidden';
        
        // Append the chat widget container to the body
        document.body.appendChild(chatWidgetContainer);

        // Your chat tool HTML content (replace with your actual HTML)
        const chatWidgetContent = `
            <div id="chat-header" style="background-color: #f1f1f1; padding: 10px; text-align: center;">
                <h3>Chat Support</h3>
            </div>
            <div id="chat-messages" style="height: 300px; overflow-y: auto; padding: 10px;"></div>
            <div id="chat-input" style="padding: 10px;">
                <input type="text" id="message-input" placeholder="Type your message..." style="width: 80%; padding: 8px;">
                <button id="send-button" style="width: 18%; padding: 8px; background-color: #4CAF50; color: white; border: none;">Send</button>
            </div>
        `;

        // Set the HTML content to the chat widget container
        chatWidgetContainer.innerHTML = chatWidgetContent;

        // Your chat tool functionality (replace with your actual functionality)
        const chatMessagesContainer = document.getElementById('chat-messages');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');

        // sendButton.addEventListener('click', () => {
        //     const messageText = messageInput.value;

        //     // Add the message to the chat messages container (replace with your actual logic)
        //     const messageElement = document.createElement('div');
        //     messageElement.textContent = `${userEmail}: ${messageText}`;
        //     chatMessagesContainer.appendChild(messageElement);

        //     // Clear the input field
        //     messageInput.value = '';
        // });

    } else {
        console.error("User is not logged in or does not have an email");
    }
}


// Load the chat tool when the script is executed
document.addEventListener('DOMContentLoaded', function () {
    initializeChatTool();
});
