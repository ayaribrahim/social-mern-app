const express = require('express');
const router = express.Router();
const auth = require('../middlerwares/auth.js');
const { getAllPosts, addPost, deletePost, updatePost, getPost } = require('../controllers/postsController.js');

router.get('/', auth, getAllPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);

module.exports = router;