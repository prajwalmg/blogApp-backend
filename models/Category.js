const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // for updatedAt and createdAt times
);

module.exports = mongoose.model("Category", CategorySchema);
