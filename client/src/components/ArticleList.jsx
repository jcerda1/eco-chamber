import React, { Component } from 'react';
import Article from './Article.jsx';

class ArticleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.articles)
    const articles = this.props.articles.length ? this.props.articles.map(article => {
      return (
        <Article article={article}/>
      )
    }) : 
    <h2 style={{"fontStyle": "italic"}}> This news source has not reported on this topic </h2>
      

    return (
      <div className="article-body" >
        {articles}
      </div>
    );
  }
}

export default ArticleList;