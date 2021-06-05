const express = require('express');
const router = express.Router();
const { getAllPots, addPost, deletePost, updatePost, getPost } = require('../controllers/postsController.js');


router.get('/', getAllPots);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);

module.exports = router;