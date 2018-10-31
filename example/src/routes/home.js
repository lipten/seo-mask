import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { Jumbotron,Button, Badge  } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    const location = window.location;
    return (
      <div className="container">
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            这是一个简单的博客网站，您现在是通过浏览器访问看到这个如此“绚丽”的网站界面，您可以继续访问博客页面查看我写的“博客”。
          </p>
          <p>
            <Button variant="primary" onClick={() => {browserHistory.push('/blog')}}>前往博客</Button>
          </p>
          <p>
            当你以搜索引擎UA来访问该路径，将会得到另一个非常简陋的页面内容。可以在命令行测试：<Badge variant="secondary">{`curl ${location.href} -H 'user-agent: Baiduspider'`}</Badge>，这就是seo-mask，专门为搜索引擎的蜘蛛提供更符合seo规范的简单页面，免除spa改造的麻烦。
          </p>
          <p><Button variant="info" onClick={() => window.open('https://github.com/lipten/seo-mask/blob/master/README.md')}>了解seo-mask</Button></p>
        </Jumbotron>
      </div>
    );
  }
}