const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  filename: String,
  fileUrl: String,
  title: String,
    uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
