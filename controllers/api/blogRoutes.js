router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    // Add this response
    res.status(200).json({ message: 'Post created successfully', blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

