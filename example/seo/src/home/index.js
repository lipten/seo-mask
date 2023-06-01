const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve('example/seo/src/home/index.ejs'), 'utf8');
const axios = require('axios');

module.exports = async (req) => {
  console.log(template)
  const result = ejs.render(template)
  return {result}
}