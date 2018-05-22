import React, { Component } from 'react';
import moment from 'moment';

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return ( 
      <div className="article-detail">
        <div className="article-detail-top">
          <div className="article-source">
            <img src={this.props.article.sourceImage}></img>
          </div>

          <div className="article-sentiment">
            SENTIMENT CHART HERE
          </div>
        </div>

        <div className="article-title">
          <h1>{this.props.article.title}</h1>
        </div>

        <div className="article-date">
          <p>{moment(this.props.article.date).fromNow()}</p>
        </div>

        <div className="article-body">
          <p>{this.props.article.body}</p>
        </div>
      </div>     
    )
  }
}

export default ArticleDetail;
