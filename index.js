const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config(); // for using/configuring the .env file
app.use(express.json()); // for sending json files
app.use("/images", express.static(path.join(__dirname, "/images"))); // Making the /images folder public

// Connecting to MongoDB using the url provided as MONGO_URL
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Using multer for file storage
const storage = multer.diskStorage({
  //diskStorage function takes in 2 objects : destination and filename
  // destination obj takes in 3 arguments req, res and callback
  destination: (req, res, cb) => {
    // In the cb first argument is set to null and the second argument is the destination folder for saving the uploaded file locally
    cb(null, "images");
  },
  filename: (req, res, cb) => {
    // The cb takes 2nd argument as the file name to be saved as locally
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage }); //Uploading storage object to the storage field

app.post("/api/upload", upload.single("file"), (req, res) => {
  // The upload.sinlge method takes a single file and the key is set to file(can be anything)
  res.status(200).json("File has been uploaded!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port 8000");
});
