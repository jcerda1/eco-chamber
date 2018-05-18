import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('article props', this.props)
    return (
      <a href={this.props.article.url} className="article">
        {this.props.article.title}
      </a>

    )
  }
}

export default Article;