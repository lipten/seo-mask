const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve('example/seo/src/layout.ejs'), 'utf8');

const layout_render = (children) => {
  return ejs.render(template, children)
}
module.exports = layout_render