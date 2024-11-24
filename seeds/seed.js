const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Sample user data
const userData = [
  {
    username: 'johndoe',
    password: 'password123', // Will be hashed by Sequelize hooks
  },
  {
    username: 'janedoe',
    password: 'password123',
  },
];

// Sample post data
const postData = [
  {
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns.',
    user_id: 1, // Linked to the first user
  },
  {
    title: 'Authentication vs Authorization',
    content: 'Authentication means confirming your identity. Authorization means verifying access.',
    user_id: 2, // Linked to the second user
  },
];

// Sample comment data
const commentData = [
  {
    content: 'Great post! Very informative.',
    user_id: 2, // Jane Doe
    post_id: 1, // First post
  },
  {
    content: 'Thanks for explaining this!',
    user_id: 1, // John Doe
    post_id: 2, // Second post
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Drops tables and recreates them

  // Bulk create users
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // Ensures passwords are hashed
    returning: true,
  });

  // Bulk create posts
  const posts = await Post.bulkCreate(postData);

  // Bulk create comments
  const comments = await Comment.bulkCreate(commentData);

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();
