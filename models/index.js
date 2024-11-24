const user = require('./user');
const blog = require('./blog');
const comment = require('./comment');

// Define relationships
user.hasMany(blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

blog.belongsTo(user, {
  foreignKey: 'user_id',
});

blog.hasMany(comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

comment.belongsTo(user, {
  foreignKey: 'user_id',
});

comment.belongsTo(blog, {
  foreignKey: 'blog_id',
});

module.exports = { user, blog, comment };
