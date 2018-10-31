const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf8');
const axios = require('axios');

// 由于mock服务跟web服务在同一个服务器里，不能用axios调用同一个服务器里的服务
// 所以用require读取mock数据伪造一下
const api = (path) => {
  return new Promise((resolve, reject) => {
    var post_list = require('../../../mock_server/data/post_list');
    resolve({data:post_list, status: 200})
  })
}
module.exports = async (req) => {
  // 假装博客数据是从api拉取的。。
  const res = await api('/api/posts')
  const result = ejs.render(template, {post_list: res.data.items})
  return {result}
}


