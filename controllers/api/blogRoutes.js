const router = require('express').Router();
const { blog } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newblog = await blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // Ensure session user is linked
    });
    res.status(200).json(newblog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// UPDATE an existing blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedblog = await blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the creator can update
      },
    });

    if (!updatedblog[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(updatedblog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// DELETE a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedblog = await blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the creator can delete
      },
    });

    if (!deletedblog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(deletedblog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;
