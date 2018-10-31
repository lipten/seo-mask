
// 为特定路径配置默认tdk
module.exports = {
  // 默认tdk，至少写一组
  '^/$': {
    title: 'SEO-Mask 示例网站',
    description: '这是一个seo-mask示例网站，项目地址https://github.com/lipten/seo-mask',
    keywords: 'seo,example',
  },
  // 可以根据不同路径匹配不同的tdk
  '^/blog$': {
    title: 'Blog - SEO-Mask 示例网站',
  },
}