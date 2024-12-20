const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/goalTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Goal schema
const goalSchema = new mongoose.Schema({
    goalName: String,
    targetAmount: Number,
    currentSavings: Number,
    monthlyContribution: Number,
    startDate: Date,
    endDate: Date,
});

const Goal = mongoose.model('Goal', goalSchema);

// API routes
// Create goal
app.post('/goals', async (req, res) => {
    try {
        const goal = new Goal(req.body);
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all goals
app.get('/goals', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update goal
app.put('/goals/:id', async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete goal
app.delete('/goals/:id', async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
