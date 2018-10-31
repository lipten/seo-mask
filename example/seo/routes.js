module.exports = {
  '^/blog$': require('./src/blog'),
  '^/blog/\\d+$': require('./src/blog_detail'),
  '^/?$': require('./src/home'),
}