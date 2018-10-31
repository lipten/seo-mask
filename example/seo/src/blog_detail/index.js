const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf8');
const axios = require('axios');

// 由于mock服务跟web服务在同一个服务器里，不能用axios调用同一个服务器里的服务
// 所以用require读取mock数据伪造一下
const api = (path) => {
  return new Promise((resolve, reject) => {
    var post_detail = require('../../../mock_server/data/post_detail');
    resolve({data:post_detail, status: 200})
  })
}

module.exports = async (req) => {
  const post_id = req.path.split('/')[2]
  // 假装博客数据是从api拉取的。。
  const res = await api(`/api/post/${post_id}`)
  const post = res.data
  const result = ejs.render(template, {post})
  const tdk = {
    title: `${post.title} - SEO-Mask 示例网站`,
    description: post.description,
    keywords: 'SEO-Mask,blog'
  }
  return {result, tdk}
}