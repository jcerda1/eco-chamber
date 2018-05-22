import React, { Component } from 'react';
import moment from 'moment';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(e) {
    this.props.toggleArticle(this.props.article);
  }

  render() {
    let isSelected = this.props.selected.filter(x=> x.id === this.props.article.id).length > 0;


    return ( 
      <div onClick={this.toggleSelected} className={isSelected ? 'article article-selected' : 'article'}>
        <div className="article-title">
          <p>{this.props.article.title}</p>
        </div>
        <div className="article-date">
          <p>{moment(this.props.article.date).fromNow()}</p>
        </div>
      </div>

    )
  }
}

export default Article;