import React, { Component } from 'react';

class ArticleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const articles = this.props.articles.length ? this.props.articles.map(({ id, title, url }) => {
      return (
        <li key={id}>
          <a style={{"text-decoration": "none", "color": "black"}} href={url} target="_blank">{title}</a>
        </li>
      )
    }) : 
    <h2 style={{"fontStyle": "italic"}}> This news source has not reported on this topic </h2>
      

    return (
      <ul className="article-body" >
        {articles}
      </ul>
    );
  }
}

export default ArticleList;