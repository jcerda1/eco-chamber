import React, { Component } from 'react';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('article props', this.props)
    return (
      <a style={{"text-decoration": "none", "color": "black", "padding": "10px"}} href={this.props.article.url} target="_blank" className="article">
        {this.props.article.title}
      </a>

    )
  }
}

export default Article;