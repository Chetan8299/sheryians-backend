const express = require("express")
const postController = require("../controllers/post.controllers")
const multer = require("multer");
const authenticate = require("../middlewares/auth.middleware");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const postRouter = express.Router();

/**
 * POST /api/posts
 */
postRouter.post("/", authenticate, upload.single("image"), postController.createPostController);

/**
 * GET /api/posts
 */
postRouter.get("/", authenticate, postController.getPostController);

/**
 * GET /api/posts/detail/:postId
 * return the postdetails using the post id 
 */
postRouter.get("/details/:postId", authenticate, postController.getPostDetailsController);

module.exports = postRouter