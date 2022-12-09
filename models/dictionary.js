const mongoose = require('mongoose');

const dictSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 100,
    },
  },
  { collection: "dictionaries" }
);

const Dictionary = mongoose.model("Dictionary", dictSchema);

module.exports = Dictionary;
