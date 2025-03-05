import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import { useSelector } from "react-redux"; // Import Redux hook

const TextInterview = () => {
    const user = useSelector((state) => state?.user?.user); // Get user details from Redux
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.current = io('http://localhost:8080'); // Ensure backend is running

        socket.current.on('connect', () => {
            console.log('Connected to server:', socket.current.id);
        });

        socket.current.on('chat message', (data) => {
            console.log('Message received:', data);
            setMessages((prevMessages) => [...prevMessages, data]); // Update state
        });

        socket.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const messageData = {
                username: user?.email || "Guest User",
                role: "Participant",
                message: input,
            };

            console.log('Sending message:', messageData);
            socket.current.emit('chat message', messageData); // Send to backend
            setInput(''); // Clear input field after sending
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f3f4f6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
                    Text-Based Interview
                </h2>
                <div
                    style={{
                        overflow: "auto",
                        height: "250px",
                        marginBottom: "16px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                    }}
                >
                    {messages.map((data, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: data.username === (user?.email || "Guest User") ? "flex-end" : "flex-start",
                                marginBottom: "10px",
                            }}
                        >
                            <div
                                style={{
                                    padding: "10px",
                                    borderRadius: "8px",
                                    maxWidth: "70%",
                                    backgroundColor: data.username === (user?.email || "Guest User") ? "#4299e1" : "#6b46c1",
                                    color: "white",
                                    textAlign: "left",
                                }}
                            >
                                <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
                                    {data.username}
                                </p>
                                <p>{data.message}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={sendMessage} style={{ display: "flex" }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        style={{
                            flex: "1",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px 0 0 4px",
                        }}
                    />
                    <button type="submit" style={{ backgroundColor: "#4299e1", color: "white", padding: "8px 16px", border: "none", borderRadius: "0 4px 4px 0", cursor: "pointer" }}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TextInterview;
