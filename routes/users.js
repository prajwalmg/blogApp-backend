const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE

// Finding user from the userId
router.put("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Checking if the entered userId is equal to the current userId(userId in the url)
  if (req.body.userId === req.params.id) {
    // Hashing the new password and updating it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // Finding the user by id and updating the details
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // Setting the new details to the current user in DB
        },
        { new: true } // To send the updated version to the api
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("YOU CAN UPDATE ONLY YOUR ACCOUNT");
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Checking if the entered userId is equal to the current userId(userId in the url)
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id); // Checking if the user exists in the DB
      try {
        await Post.deleteMany({ username: user.username }); // Deleting all the posts of that user from DB
        await user.delete(); // Deleting the user from DB

        res.status(200).json("User has been deleted!");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("YOU CAN DELETE ONLY YOUR ACCOUNT");
  }
});

// GET USER

router.get("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc;

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
