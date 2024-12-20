
from flask import Flask, request, jsonify,render_template
from dotenv import load_dotenv
import os
import google.generativeai as genai
from flask_cors import CORS
from pymongo import MongoClient

load_dotenv()
app = Flask(__name__)
CORS(app) 
genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/Smartfin")
mongo_client = MongoClient(mongo_uri)
db = mongo_client['Smartfin'] 
transactions_collection = db['userinfos']

def get_gemini_response(question):
    response = chat.send_message(question, stream=True)
    return response



@app.route('/ask-question', methods=['POST'])
def ask_question():
    try:

        data = request.get_json()
        question = data.get('question')

        if not question:
            return jsonify({'error': 'No question provided'}), 400


        response = get_gemini_response(question)


        result = ''
        for chunk in response:
            result += chunk.text

        print(result)

        return jsonify({'answer': result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/get-transactions', methods=['POST'])
def get_transactions():
    try:
        data = request.get_json()
        fullname = data.get('fullname')

        if not fullname:
            return jsonify({'error': 'No fullname provided'}), 400

        user = userinfos_collection.find_one({'fullname': fullname}, {'_id': 0, 'transactions': 1})
        if user and 'transactions' in user:
            return jsonify({'transactions': user['transactions']}), 200
        else:
            return jsonify({'message': 'No transactions found for this user'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=7000)