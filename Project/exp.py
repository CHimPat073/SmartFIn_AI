from flask import Flask, request, jsonify, render_template,redirect
import requests
import json

app = Flask(__name__)

@app.route('/')
def home():
    return redirect('chatbot.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()

    if 'hello' in user_message:
        bot_reply ="Hello!!,Welcome to SmartFin Ai Assistant."
    elif 'What is Income' in user_message:
        bot_reply="Money received, typically from work, investments, or business activities."
    elif 'What is Finance' in user_message:
        bot_reply="Finance is the study of Managing Money,including how to create,manage,and use it."   
    elif 'What is Portfolio' in user_message:
        bot_reply="A collection of financial investments like stocks, bonds, and funds."
    elif 'What is Interst Rate' in user_message:
        bot_reply="The percentage charged by a lender or earned on savings, expressed annually."
    elif 'What is expense' in user_message:
        bot_reply="Money spent on goods, services, or other necessbot_reply."
    elif 'What is investment' in user_message:
        bot_reply = "Investments are subject to market risks. Diversify your portfolio for better results."
    elif 'What is budget' in user_message:
        bot_reply = "Creating a budget helps you control expenses. Start by allocating fixed amounts to essentials!"
    else:
        bot_reply = "I'm here to help! Could you provide more details?"

    return jsonify({'reply': bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
