const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        required: [true, "imgURL is required for creating a post"]
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating a post"]
    }
})

const postModel = mongoose.model("post", postSchema);

module.exports = postModel