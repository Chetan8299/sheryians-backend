const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function registerController(req, res) {
    const { email, username, password, bio, profileImage } = req.body;

    // const isUserExistByEmail = await userModel.findOne({ email });

    // if (isUserExistByEmail) {
    //     return res.status(409).json({
    //         message: "user already exists with same email."
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({ username });

    // if (isUserExistByUsername) {
    //     return res.status(409).json({
    //         message: "username already taken"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists." + (isUserAlreadyExists.email === email ? "Email already registered." : "Username already userd.")
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profileImage
    })

    /**
     * - user ka data hona chahiye
     * - unique data hona chahiye
     */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            messagae: "Password is not correct"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token);

    res.status(200).json({
        message: "Login successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}