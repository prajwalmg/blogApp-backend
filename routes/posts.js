const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE POST

router.post("/", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const newPost = await Post(req.body);

  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE POST

router.delete("/:id", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // Checking if the entered userId is equal to the current userId(userId in the url)

  try {
    const post = await Post.findById(req.params.id);
    try {
      //Checking if the username entered is equal to the author's username
      if (post.username === req.body.username) {
        await post.delete();

        res.status(200).json("Post has been deleted!");
      } else {
        res.status(401).json("YOU CAN DELETE POSTS ONLY FROM YOUR ACCOUNT");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(404).json("Post not found!");
  }
});

// UPDATE POST

router.put("/:id", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } else {
      res.status(401).json("YOU CAN ONLY UPDATE POSTS FROM YOUR ACCOUNT");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POST

router.get("/:id", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL POSTS

router.get("/", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const username = req.query.user;
  const category = req.query.category;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }); // this expression is equivalent to {username: username}
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category], // Checks if category in the query present in categories array of the PostSchema
        },
      });
    } else {
      posts = await Post.find(); // If no query the it finds all the posts available
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
