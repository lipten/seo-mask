const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf8');
const axios = require('axios');

module.exports = async (req) => {
  const result = ejs.render(template)
  return {result}
}