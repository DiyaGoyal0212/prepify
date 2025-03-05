const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function userSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
                success: false,
                error: true,
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        // Compare input password with hashed password in DB
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false,
                error: true,
            });
        }

        // Generate JWT Token
        const tokenData = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "8h",
        });

        console.log("Signing Token with Secret Key:", process.env.TOKEN_SECRET_KEY);

        // Cookie options
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true in production
            sameSite: "strict",
        };

        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successful",
            success: true,
            user: {
                _id: user._id,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            error: true,
        });
    }
}

module.exports = userSignin;
