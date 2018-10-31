const default_opt = {
  routes: {},
  tdk_config: {},
  layout_render: () => {}
}

module.exports = function(opt) {
  const {routes, tdk_config, layout_render} = {...default_opt, ...opt}
  return (req, res, next) => {
    // 各大搜索引擎蜘蛛UA
    const spiderUA = /Baiduspider|bingbot|Googlebot|360spider|Sogou| Yahoo! Slurp/
    const isSpider = spiderUA.test(req.get('user-agent'))
    const seoPath = Object.keys(routes)
    
    const tdk_routes = Object.keys(tdk_config);
    // 默认用首页的tdk
    if (isSpider) {
      for (let i=0,route; route = seoPath[i]; i++) {
        if (new RegExp(route).test(req.path)) {
          routes[route](req).then((result) => {
            // 如果没有页面数据相关的业务tdk，则使用默认tdk配置
            var tdk_data = tdk_config[tdk_routes[0]]
            for (let j=0,tdk; tdk = tdk_routes[j]; j++) {
              if (new RegExp(tdk).test(req.path)) {
                tdk_data = {...tdk_data, ...tdk_config[tdk]}
                break;
              }
            }
            // 从默认TDK配置中匹配到对应路径的tdk，与seo里的tdk合并
            result.tdk = !result.tdk ? tdk_data : {...tdk_data, ...result.tdk}
            res.set({
              'Content-Type': 'text/html',
              'charset': 'utf-8mb4',
            }).status(200).send(layout_render(result))
          })
          break;
        }
      }
    } else {
      return next()
    }
  }
}