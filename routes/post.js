const express = require("express");
const router = express.Router();
const Post = require("../controllers/post");

router.get("/", Post.getPost);
router.post("/:user_id", Post.createPost);

module.exports = router;
