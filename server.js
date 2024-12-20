const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'VITISASHITCLG', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` if using HTTPS
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/SmartFin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define the UserInfo schema to include a transactions array
const userInfoSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Optional: Track registration date
    transactions: [{
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ['credit', 'debit'], required: true },
        date: { type: Date, required: true },
    }],
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

// Routes

// 1. Register a new user
app.post('/user/register', async (req, res) => {
    const { fullname, email, mobile, password, transactions = [] } = req.body;

    // Validation
    if (!fullname || !email || !mobile || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newUser = new UserInfo({ fullname, email, mobile, password, transactions });
        const savedUser = await newUser.save();

        // Create a session for the user
        req.session.user = {
            id: savedUser._id,
            fullname: savedUser.fullname,
            email: savedUser.email,
        };

        res.status(201).json({
            message: 'User registered successfully',
            session: req.session.user,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 11000) { // Handle duplicate email error
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Error registering user');
        }
    }
});

// 2. User login
app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Find user by email
        const user = await UserInfo.findOne({ email });
        if (!user) {
            return res.status(401).send('Login credentials wrong'); // User not found
        }

        // Validate password
        if (user.password !== password) {
            return res.status(401).send('Login credentials wrong'); // Password mismatch
        }

        // Generate session ID
        const sessionID = crypto.randomBytes(16).toString('hex');

        // Send session ID to the client
        res.status(200).json({ sessionID, user: { fullname: user.fullname, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred during login');
    }
});

// 3. Fetch all transactions for a user
app.get('/transactions/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserInfo.findOne({ email: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user.transactions); // Send back the transactions array
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
});

// 4. Add a new transaction for a user
app.post('/transactions/add/:userId', async (req, res) => {
    const { userId } = req.params;
    const { description, amount, type, date } = req.body;

    console.log(description,amount,type,date,userId)

    // Validation
    if (!userId || !description || isNaN(amount) || !type || !date) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Find the user by ID and add the new transaction to their transactions array
        const user = await UserInfo.findOne({ email: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create the new transaction object
        const newTransaction = {
            description,
            amount,
            type,
            date,
        };

        // Push the new transaction to the user's transactions array
        user.transactions.push(newTransaction);

        // Save the updated user document
        await user.save();

        // Send back the saved transaction
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).send('Error adding transaction');
    }
});

// 5. Delete a transaction by ID
app.delete('/transactions/:userId/:transactionId', async (req, res) => {
    const { userId, transactionId } = req.params;

    try {
        // Find the user by ID
        const user = await UserInfo.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Remove the transaction from the user's transactions array
        const transactionIndex = user.transactions.findIndex(transaction => transaction._id.toString() === transactionId);
        if (transactionIndex === -1) {
            return res.status(404).send('Transaction not found');
        }

        // Remove the transaction
        user.transactions.splice(transactionIndex, 1);

        // Save the updated user document
        await user.save();

        res.status(200).send('Transaction deleted');
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).send('Error deleting transaction');
    }
});


app.get("/register", (req, res) => {
    res.sendFile("E:/Sides/MAIN-Project-Finance Trackercopy/SmartFIn_AI/sign-up.html");
});

app.get("/home", (req, res) => {
    res.sendFile("E:/Sides/MAIN-Project-Finance Trackercopy/SmartFIn_AI/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile("E:/Sides/MAIN-Project-Finance Trackercopy/SmartFIn_AI/login.html");
});

app.get("/dashboard", (req, res) => {
    res.sendFile("E:/Sides/MAIN-Project-Finance Trackercopy/SmartFIn_AI/dashboard.html");
});

app.get("/chatbot", (req, res) => {
    res.sendFile("E:/Sides/MAIN-Project-Finance Trackercopy/SmartFIn_AI/chatbots.html");
});
app.get("/goal", (req, res) => {
    res.sendFile("E:/Sides/MAIN-Project-Finance Trackercopy/SmartFIn_AI/New Goal Tracker/goals.html");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
