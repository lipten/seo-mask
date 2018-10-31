import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Router, Route, browserHistory } from 'react-router'
import Home from './routes/home';
import Blog from './routes/blog';
import BlogDetail from './routes/blog_detail';


class App extends Component {
  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark" style={{marginBottom: '30px'}}>
            <Navbar.Brand>SEO-Mask</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => {browserHistory.push('/')}}>Home</Nav.Link>
              <Nav.Link onClick={() => {browserHistory.push('/blog')}}>Blog</Nav.Link>
            </Nav>
          </Navbar>
          <Router history={browserHistory}>
            <Route path="/" component={Home}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/blog/:id" component={BlogDetail}/>
          </Router>
      </div>
    );
  }
}

export default  App
