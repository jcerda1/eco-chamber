import React, { Component } from 'react';
import moment from 'moment';
import ArticleSentimentRadarChart from './ArticleSentimentRadarChart.jsx';

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const Sentiments = this.props.article.Sentiments;

    const chart = this.props.article.Sentiments.length === 0 
        ? (<div></div>)
        : (<ArticleSentimentRadarChart sentiments={this.props.article.Sentiments}/>);

    return (  

      <div className="article-detail">
        <div className="article-detail-top">
          <div className="article-source">
            <img src={this.props.article.sourceImage}></img>
            <a href={this.props.article.url} target="_blank"><h2>{this.props.article.title}</h2></a>
            <div className="article-date">
              <p>{moment(this.props.article.date).fromNow()}</p>
            </div>             
          </div>
          {chart}
        </div>

        <div className="article-body">
          <p>{this.props.article.body}</p>
        </div>
      </div>     
    )
  }
}

export default ArticleDetail;
