const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Checking if the username or password already exists in the DB
    const enteredUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    enteredUser && res.status(500).json("User already exists!");

    // Creating a new user using the UserSchema
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save(); // To save the user details in the database

    const { password, ...others } = user._doc; // To hide the password from being displayed in the output
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  try {
    // Searching for the user in the database
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(500).json("Wrong credentials!");

    // Validating the entered password with the hashed password
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated &&
      res.status(500).json("ERROR: Please enter the correct password!");

    const { password, ...others } = await user._doc; // To hide the password from being displayed in the output
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
