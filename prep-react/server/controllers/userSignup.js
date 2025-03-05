const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUp(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false,
                error: true,
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
                error: true,
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            email,
            password: hashedPassword, // Save hashed password
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            error: true,
        });
    }
}

module.exports = userSignUp;
