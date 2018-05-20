import React, { Component } from 'react';
import moment from 'moment';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return ( 
      <a href={this.props.article.url} target="_blank" className="article">
        <div className="article-title">
          <p>{this.props.article.title}</p>
        </div>
        <div className="article-date">
          <p>{moment(this.props.article.date).fromNow()}</p>
        </div>
      </a>

    )
  }
}

export default Article;