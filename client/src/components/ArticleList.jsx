import React, { Component } from 'react';
import Article from './Article.jsx';

class ArticleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   
    const articles = this.props.articles.length ? this.props.articles.map(article => {
      return (
        <Article key={article.id} article={article}/>
      )
    }) : 
    <div></div>
     
    return (
      <div className="article-body">
        {articles}
      </div>
    );
  }
}

export default ArticleList;