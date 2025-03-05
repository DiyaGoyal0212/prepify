const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const videoRoutes = require("./routes/videoRoutes");
const router = require('./routes');
const authRoutes = require("./middleware/authToken");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS configuration
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));

// Routes
app.use("/api", router);
app.use("/api/auth", authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/interviews', interviewRoutes);
app.use("/api/videos", videoRoutes);

// Dummy test data
const testData = {
    1: {
        title: "JavaScript",
        questions: [
            { type: "mcq", text: "What does `typeof null` return?", options: ["null", "undefined", "object", "string"], answer: "object" },
            { type: "coding", text: "Write a function to reverse a string." }
        ],
    },
    2: {
        title: "Python",
        questions: [
            { type: "mcq", text: "What is the output of `2 ** 3`?", options: ["5", "6", "8", "9"], answer: "8" },
            { type: "coding", text: "Write a function to check if a number is even." }
        ],
    },
};

// API Endpoints
app.get("/api/tests/:testId", (req, res) => {
    const { testId } = req.params;
    const test = testData[testId];
    if (test) {
        res.json(test);
    } else {
        res.status(404).json({ error: "Test not found" });
    }
});

app.post("/api/submit-test", (req, res) => {
    console.log("Received test results:", req.body);
    res.json({ message: "Test submitted successfully" });
});

// Socket.IO Handling
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle chat messages
    socket.on('chat message', (data) => {
        console.log('Message received:', data);
        io.emit('chat message', data); // Broadcast message to all clients
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    console.log("Connected to database");
}).catch((err) => console.log('Database error:', err));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
