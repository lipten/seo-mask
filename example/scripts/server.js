var path = require('path')
var express = require('express')
var app = express()
var compression = require('compression')
var fs = require('fs')

var port = 8010

app.use(compression());
// mock服务
app.use(require('../mock_server'))

app.use(require('../../seo-mask')({
  routes: require('../seo/routes'),
  tdk_config: require('../seo/tdk'),
  layout_render: require('../seo/src/layout'),
}));
app.use(express.static(path.join(__dirname, '../build/')));

app.use((req, res, next) => {
  res.send(fs.readFileSync(path.join(__dirname, '../build/index.html'), {encoding: 'utf-8'}))
})
app.listen(port, function () {
  console.log('listening '+ port)
})
