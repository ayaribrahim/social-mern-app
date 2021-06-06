const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 200
  },
  author: String,
  likes: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
