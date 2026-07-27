const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Check if all fields are filled
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                rank: user.rank,
                level: user.level,
                xp: user.xp,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please enter email and password",
            });

        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });

        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });

        }

        // Create JWT
        const token = jwt.sign(

            {
                id: user._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }

        );

        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user._id,
                username: user.username,
                email: user.email,
                level: user.level,
                xp: user.xp,
                rank: user.rank,

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Server Error",

        });

    }

};

const verifyToken = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Token verification failed"
        });

    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
};