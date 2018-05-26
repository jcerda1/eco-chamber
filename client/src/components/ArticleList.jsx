import React, { Component } from 'react';
import Article from './Article.jsx';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.articles
    }
    this.sortArticles = this.sortArticles.bind(this);
  }

  componentDidMount() {
    this.sortArticles();
  }

  sortArticles() {
    let articles = this.state.articles;
    let sorted = articles.sort((a, b) => a.date < b.date);
    this.setState({articles: sorted});
  }

  render() {
  
    const articles = this.state.articles.length ? this.state.articles.map(article => {
      return (
        <Article selected={this.props.selected} toggleArticle={this.props.toggleArticle} key={article.id} article={article}/>
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