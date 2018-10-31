var post_list = require('./data/post_list');
var post_detail = require('./data/post_detail');
module.exports = function(req,res,next) {
  if (/^\/api/.test(req.path)) {
    if (/\/post\/\d+/.test(req.path)) {
      res.send(post_detail);
    } else if (/\/posts$/.test(req.path)) {
      res.send(post_list);
    } else {
      next()
    }
  } else {
    next();
  }
}