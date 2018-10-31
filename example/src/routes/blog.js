import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {Card, Button, Jumbotron, Badge} from 'react-bootstrap';
import axios from 'axios';

export default class Blog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      post_list: [],
      post_count: 0,
    };
  }
  componentDidMount() {
    // 从Mock服务器获取博客列表
    axios.get('/api/posts').then((res) => {
      this.setState({post_list: res.data.items, post_count: res.data.total})
    })
  }
  render() {
    const {post_list, post_count} = this.state;
    const location = window.location;
    return (
      <div class="container">
        <Jumbotron>
          <h1>查看当前页面的seo-mask</h1>
          <p>
            在命令行测试：<Badge variant="secondary">{`curl ${location.href} -H 'user-agent: Baiduspider'`}</Badge>
          </p>
          <p><Button variant="info" onClick={() => window.open('https://github.com/lipten/seo-mask/blob/master/README.md')}>了解seo-mask</Button></p>
        </Jumbotron>
        {
          post_list.map((item) => {
            return (
              <Card style={{ width: '500px', margin: '30px auto', cursor: 'pointer' }}  onClick={()=>{browserHistory.push(`/blog/${item.id}`)}}>
                <Card.Img variant="top" src={item.banner} style={{width: '500px', height: '300px', background: '#ddd'}}/>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Button variant="primary" onClick={()=>{browserHistory.push(`/blog/${item.id}`)}}>Go somewhere</Button>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
    );
  }
}