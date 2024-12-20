const chatMessages = document.getElementById('chat-messages');

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message === '') return;

    // Add user's message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);

    // Clear input field
    userInput.value = '';

    // Simulate bot response
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot-message';
    botMessageDiv.textContent = getBotResponse(message);
    chatMessages.appendChild(botMessageDiv);

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    // Replace this with AI or predefined responses
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello')){
        return "Hello!! , Welcome to SmartFin AI Assistant. ";
    }
    else if (lowerMessage.includes('finance')){
        return "Finance is the study of Managing Money,including how to create,manage,and use it."
    }
    else if (lowerMessage.includes('income')){
        return "Money received, typically from work, investments, or business activities."
    }
    else if (lowerMessage.includes('portfolio')){
        return "A collection of financial investments like stocks, bonds, and funds."
    }
    else if (lowerMessage.includes('interst Rate')){
        return "The percentage charged by a lender or earned on savings, expressed annually."
    }
    else if (lowerMessage.includes('expense')){
        return "Money spent on goods, services, or other necessities."
    }
    else if (lowerMessage.includes("investment")) {
        return "Investments are subject to market risks. Diversify your portfolio for better results.";
    } else if (lowerMessage.includes("budget")) {
        return "Creating a budget helps you control expenses. Start by allocating fixed amounts to essentials!";
    } else {
        return "I'm here to help! Could you provide more details?";
    }
}
