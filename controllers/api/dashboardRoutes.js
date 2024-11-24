const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth'); // Middleware to protect routes

// GET all blogs for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE an existing blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedBlog[0]) {
      res.status(404).json({ message: 'No blog found with this ID!' });
      return;
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedBlog) {
      res.status(404).json({ message: 'No blog found with this ID!' });
      return;
    }

    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
