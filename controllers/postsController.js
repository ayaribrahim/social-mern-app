const Post = require('../models/Post.js');

exports.getAllPosts = async (req, res) => {
  try {
    const response = await Post.find({});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

exports.getPost = async function (req, res) {
  try {
    const response = await Post.findById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

exports.addPost = async (req, res) => {
  const { content, author, likes } = req.body;
  const newPost = new Post({ content, author, likes });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {

    const post = await Post.findById(id);
    if (!post) return res.status(404).send('Post not found');

    await Post.findByIdAndDelete(id);
    res.status(200).send('Post deleted');

  } catch (err) {
    res.status(500).send('Server Error');
  }
}

exports.updatePost = async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);
  if (!post) return res.status(404).send('Post not found');

  if (req.body.count) {
    const newLikes = getNewLikes(post.likes, req.body.count)
    const result = await Post.findOneAndUpdate({ _id: id }, { likes: newLikes });
    res.status(200).json(newLikes);
  }

  if (req.body.content && req.body.content !== post.content) {
    const result = await Post.findOneAndUpdate({ _id: id }, { content: req.body.content }, { new: true });
    res.status(200).json(result);
  }

  res.status(200).json(post);
}

function getNewLikes(likes, count) {
  if (count === 1) {
    likes += count;
  } else {
    likes = (likes > 0) ? likes += count : likes;
  }
  return likes;
}

