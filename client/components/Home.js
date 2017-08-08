import React, { Component } from 'react';
import Header from './Header';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Header router={this.props.router}/>
        {this.props.children}
      </div>
    );
  }
};

export default Home;