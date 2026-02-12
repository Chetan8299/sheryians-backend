const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User name already exists"],
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email alredy registered"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }, 
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/qd8narma9/user.jpg"
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;