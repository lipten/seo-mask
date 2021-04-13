# seo-mask

seo-mask是利用搜索引擎蜘蛛的爬取原理（蜘蛛只会爬取网页的内容，并不会关心解析网页里的css和js），制作一套专门针对seo的镜像网站，鄙人称它为针对seo的mask，让蜘蛛看到的是网站的mask更利于收录。无需改变原有网站的源码，此方法适合seo改造成本较大的具有动态数据的spa单页应用。

## 与流行的seo方案对比
|    | 优点 | 缺点 |
| ------ | ------ | ------ |
| prerender 预渲染 | 部署方便，开发成本低 | 1. 无法render动态改变的页面(如：某商品详情页) ; 2. 页面太多时造成存储负担 |
| ssr服务端渲染 | 一步到位，开发自主控制页面渲染 | 1. 对于已在线上运营的spa项目改造成本太大； 2. 开发过程需要考虑seo规范；3.需要对服务器深入了解优化渲染 |
| seo-mask | 1. 无需改动源代码；2. 自由决定需要被爬取的内容 | 1.需要另外维护一套网站代码(开发成本极低) |

## 适用范围
* 复杂型单页应用（如：论坛、商城、新闻等）
* 已经在线上运营改造服务端渲染成本巨大的单页应用
* express作为启动服务器(后期会陆续推出适配不同服务器的版本)

# Demo
[一个简易的博客网站](http://seo_mask.lipten.link)


Demo网站是一个基于cra开发的简易博客示例，在该项目的example目录，你可以下载下来本地运行：

```
git clone https://github.com/lipten/seo-mask.git

cd seo-mask/example

npm install

npm run start
```

------

## Install
```
// With npm
npm install seo-mask

// With bower
bower install seo-mask
```

## Usage
请确保你的项目启动服务器是express或者是基于express的webpack-dev-server，再进行下面的操作。

* 在你的启动服务器实例`var app = express()`加入seo-mask中间件，还有相应的配置数据即可。
```
app.use(require('seo-mask')({
  routes: require('../seo/routes'),
  tdk_config: require('../seo/tdk'),
  layout_render: require('../seo/src/layout'),
}));
```

* 如果是webpack-dev-server，则在devServer的配置里的`before`，加入代码：
> [webpack: devServer.before](https://webpack.js.org/configuration/dev-server/#devserver-before)
```
before(app, server) {
  app.use(require('seo-mask')({
    routes: require('../seo/routes'),
    tdk_config: require('../seo/tdk'),
    layout_render: require('../seo/src/layout'),
  }));

  ......
},
```
传入一个对象，分别有`routes`、`tdk_config`和`layout_render`三个属性，具体释义和教程请接着往下看：


### SEO目录
在你的项目里新建一个seo目录，该目录用于配置你的mask网站路由及网站的TDK(title、description和keywords)配置，以及mask网站的所有内容。

目录结构如下：
```
my-app/
  ├── xxxx
  └── seo/
      ├── src/                  # mask网站内容
      |   |—— home/             # 根据自身业务需求建立seo-mask页面
      |   |   |—— index.ejs
      |   |   └── index.js
      |   |—— blog/             # 根据你的网站的页面做调整，这里假设是blog
      |   |   |—— index.ejs
      |   |   └── index.js
      |   |—— blog_detail/
      |   |   |—— index.ejs
      |   |   └── index.js
      |   |—— layout.ejs        # seo-mask网站也需要一个layout布置网站head或一些公共元素
      |   └── layout.js         # 提供layout_render渲染整个mask网站
      |—— routes.js             # routes配置匹配特定的路径指向对应的mask页面
      └── tdk.js                # 配置特定路径的默认tdk，必须要有一组作为网站的默认tdk
```

1. 编辑tdk.js、routes.js以及layout.js：

```
// seo/tdk.js

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

// seo/routes.js
module.exports = {
  '^/blog$': require('./src/blog'),
  '^/blog/\\d+$': require('./src/blog_detail'),
  '^/?$': require('./src/home'),
}

// seo/src/layout.js

const ejs = require('ejs')  //记得要装ejs模块：npm install -D ejs
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './layout.ejs'), 'utf8');

const layout_render = (children) => {
  return ejs.render(template, children)
}
module.exports = layout_render

```

2. 接着定义你的layout.ejs模板:

```
// seo/src/layout.ejs
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name=”renderer” content=”webkit”>
  <meta content="<%= tdk.keywords%>" name="keywords"/>
  <meta content="<%= tdk.description%>" name="description"/>
  <title><%= tdk.title%></title>
</head>
<body>
  <div id="root">
    <nav>
      <a href="/">home</a>
      <a href="/blog">blog</a>
    </nav>
    <%- result -%>
    <p>友情链接</p>
    <a href="http://xxx.xx">xx</a>
  </div>
</body>
</html>

```

3. 其他的页面模板可以用很简洁的html来写，js直接渲染:

```
// seo/src/home/index.ejs

<div>
  <h1>SEO-Mask 首页</h1>
  <h2>Hello, world!</h2>
  <p>
    这是一个简单的博客网站，您现在是通过搜索引擎蜘蛛访问看到这个简单的网站内容，您可以继续访问博客页面查看我写的“博客”。
  </p>
  <a href="/blog">前往博客</a>
</div>



// seo/src/home/index.js

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf8');
const axios = require('axios');

module.exports = async (req) => {
  const result = ejs.render(template)
  return {result}
}
```

4. 需要从接口拉取动态数据的页面也可以做到：

```
// seo/src/blog/index.ejs

<div>
  <ul>
    博客列表
    <% post_list.map((item) => { %>
    <li><a href="/blog/<%= item.id-%>" target="_blank"><%= item.title-%></a></li>
    <% })%>
  </ul>
</div>


// seo/src/blog/index.js
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf8');
const axios = require('axios');

module.exports = async (req) => {
  // 假装博客数据是从api拉取的。。
  const res = await axios('/api/posts')
  const result = ejs.render(template, {post_list: res.data.items})
  return {result}
}

```

6. 需要在博客详情页设置网站标题为博客标题也可以做到：

```
// seo/src/blog_detail/index.ejs

<div>
  <h1>博客标题<%= post.title%></h1>
  <p><%= post.content%></p>
</div>


// seo/src/blog_detail/index.js
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, './index.ejs'), 'utf8');
const axios = require('axios');

module.exports = async (req) => {
  const post_id = req.path.split('/')[2]
  // 假装博客数据是从api拉取的。。
  const res = await axios.get(`/api/post/${post_id}`)
  const post = res.data
  const result = ejs.render(template, {post})
  // 设置博客标题为网站标题，动态设置tdk
  const tdk = {
    title: `${post.title} - SEO-Mask 示例网站`,
    description: post.description,
    keywords: 'SEO-Mask,blog'
  }
  return {result, tdk}
}

```
# Resource
[单页应用SPA做SEO的一种清奇的方案](https://www.cnblogs.com/lipten/p/9609678.html)

# License
MIT
