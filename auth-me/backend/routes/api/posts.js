const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
  }));

const validatePost = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a post.'),
    handleValidationErrors
];

// Post post
router.post(
  '/',
  validatePost,
  asyncHandler(async (req, res) => {
    const post = await Post.create(req.body);

    await setTokenCookie(res, user);

    return res.json(post);
  }),
);

module.exports = router;