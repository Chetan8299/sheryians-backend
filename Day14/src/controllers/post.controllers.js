const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    const { caption } = req.body

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "cohort-2-insta-clone"
    })

    const post = await postModel.create({
        caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController (req, res) {
    const userId = req.user.id;

    const posts = await postModel.find({
        user:userId
    })

    res.status(201).json({
        message: "Posts retrieved successfully",
        posts
    })
}

async function getPostDetailsController (req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId)

    if(!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = userId == post.user.toString();

    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        }) 
    }

    return res.status(200).json({
        message: "Post retrieved successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}