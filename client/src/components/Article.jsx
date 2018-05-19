import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return ( 
      <a href={this.props.article.url} target="_blank" className="article">
        <p>{this.props.article.title}</p>
      </a>
    )
  }
}

export default Article;