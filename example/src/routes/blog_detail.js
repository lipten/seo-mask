import React, { Component } from 'react';
import {Card, Button, Jumbotron, Badge} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import axios from 'axios';

export default class BlogDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      post: {}
    };
  }
  componentDidMount() {
    // 从Mock服务器获取博客列表
    axios.get('/api/post/' + this.props.params.id).then((res) => {
      this.setState({post: res.data})
    })
  }
  render() {
    const {post} = this.state;
    const location = window.location;
    return (
      <div class="container" style={{marginBottom: '30px'}}>
        <Jumbotron>
          <h1>查看当前页面的seo-mask</h1>
          <p>
            在命令行测试：<Badge variant="secondary">{`curl ${location.href} -H 'user-agent: Baiduspider'`}</Badge>
          </p>
          <p><Button variant="info" onClick={() => window.open('https://github.com/lipten/seo-mask/blob/master/README.md')}>了解seo-mask</Button></p>
        </Jumbotron>
        <Card>
          <Card.Img variant="top" src={post.banner} style={{width: '100%', background: '#ddd'}}/>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.content}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}