Hello Everyone This is group project for our University. Group no. 108.
Guide:- Dr. Pranshu Pranjal ,VIT Bhopal University

#SmartFin Finance Management and Advisor

## Overview
SmartFin is a comprehensive finance management and advisory platform designed to help users efficiently track their income and expenses, analyze spending patterns, and receive personalized financial advice. The platform integrates an interactive chatbot to provide financial insights and recommendations to users.

## Features
- **User Authentication**: Secure login and registration system.
- **Expense Management**: Track and categorize expenses with ease.
- **Data Visualization**: Graphical representations of financial data for better insights.
- **Financial Chatbot**: A generic bot to assist users with financial advice and queries.
- **Tech Stack**:
  - **Frontend**: HTML, CSS
  - **Backend**: Node.js, Flask
  - **Database**: MongoDB

## Tech Stack Details
### Frontend
The user interface is built using:
- **HTML**: For structuring the webpage.
- **CSS**: For styling and enhancing the user experience.

### Backend
- **Node.js**: Powers the core server-side logic and handles API endpoints for financial management features.
- **Flask**: Supports the chatbot's backend functionalities.

### Database
- **MongoDB**: Stores user information and financial data securely.

### Chatbot Integration
The chatbot, designed for providing financial advice, uses:
- **Flask** for handling user interactions.
- **Modules**:
  - `flask_CORS`: Enables Cross-Origin Resource Sharing for the Flask application.
  - `genai gemini`: Powers the generative AI capabilities for the chatbot.
  - `os`: Manages environment-level operations.
  - `dotenv`: Handles environment variables securely.

## Installation
### Prerequisites
- Node.js
- Python (with Flask installed)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd SmartFin
   ```
3. Install dependencies:
   - For Node.js backend:
     ```bash
     npm install
     ```
   - For Flask backend:
     ```bash
     pip install -r requirements.txt
     ```
4. Set up environment variables:
   - Create a `.env` file and configure the required keys.

5. Start the MongoDB server:
   ```bash
   mongod
   ```
6. Run the Node.js backend:
   ```bash
   node app.js
   ```
7. Run the Flask server:
   ```bash
   flask run
   ```
8. Open the application in your browser at `http://localhost:3000`.

## Usage
1. Register or log in to your account.
2. Add and manage your income and expenses.
3. View detailed insights via graphical representations.
4. Interact with the chatbot for personalized financial advice.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- **Team SmartFin** for their hard work and dedication.
- Open-source contributors for providing essential tools and libraries.

## Contact
For any inquiries or support, please reach out to us at [contact@smartfin.com](mailto:contact@smartfin.com).
