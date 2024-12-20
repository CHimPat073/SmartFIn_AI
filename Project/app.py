import os
from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
import dialogflow_v2 as dialogflow

app = Flask(__name__)


client = MongoClient("mongodb://localhost:27017/")  
db = client['your_database_name']
user_collection = db['your_collection_name']

# Dialogflow setup
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "path/to/your/dialogflow-key.json"
DIALOGFLOW_PROJECT_ID = "your-dialogflow-project-id"

# Dialogflow helper function
def get_dialogflow_response(session_id, text_input):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(DIALOGFLOW_PROJECT_ID, session_id)

    text_input_obj = dialogflow.types.TextInput(text=text_input, language_code="en")
    query_input = dialogflow.types.QueryInput(text=text_input_obj)

    response = session_client.detect_intent(request={"session": session, "query_input": query_input})
    return response.query_result

# Flask routes
@app.route("/")
def index():
    return render_template("chatbot.html")  # Your HTML frontend file

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    session_id = request.json.get("session_id", "default_session")
    dialogflow_result = get_dialogflow_response(session_id, user_message)

    # Get Dialogflow response and detected intent
    fulfillment_text = dialogflow_result.fulfillment_text
    intent_name = dialogflow_result.intent.display_name

    # Handle dynamic intents with MongoDB
    if intent_name == "Balance Inquiry Intent":
        user_data = user_collection.find_one({"user_id": "example_user_id"})  # Replace with dynamic user ID
        if user_data:
            fulfillment_text = f"Your current balance is {user_data.get('balance', 'not available')}."
        else:
            fulfillment_text = "User data not found."
    elif intent_name == "Transaction History Intent":
        transactions = user_collection.find_one({"user_id": "example_user_id"}, {"transactions": 1})
        if transactions and "transactions" in transactions:
            fulfillment_text = f"Your last transaction was {transactions['transactions'][-1]}."
        else:
            fulfillment_text = "No transaction data available."

    return jsonify({"response": fulfillment_text})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
