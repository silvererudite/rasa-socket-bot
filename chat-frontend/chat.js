// Initialize socket connection to Rasa server
const socket = io('http://localhost:5005');

// Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to append a message to the chat box
function appendMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to the latest message
}


function sendMessageToBot(message) {
    socket.emit('user_uttered', { message: message }, (response) => {
        // Assuming response contains 'text' field with bot's reply
        appendMessage(response.text, false);
    });
}


sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        appendMessage(message); // Display user message
        sendMessageToBot(message); // Send message to bot
        userInput.value = ''; // Clear input field
    }
});


userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});

// Handle messages from Rasa bot (optional, in case you want to handle custom events)
socket.on('bot_uttered', (data) => {
    if (data.text) {
        appendMessage(data.text, false); // Display bot's response
    }
});
