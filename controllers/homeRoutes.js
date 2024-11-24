const router = require('express').Router();
const { Blog, User, Comment } = require('../models'); // Include Comment model if you want to display comments
const withAuth = require('../utils/auth');

// GET homepage with all blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET dashboard (requires authentication)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', { blogs, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// GET new post page (requires authentication)
router.get('/new-post', (req, res) => {
  if (req.session.logged_in) {
    res.render('new-post', { logged_in: true });
  } else {
    res.redirect('/login');
  }
});

// GET a single blog post by ID, including comments
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }], // Include comments and the usernames of comment authors
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this ID!' });
      return;
    }

    const blog = blogData.get({ plain: true });
    res.render('blog', { blog, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;