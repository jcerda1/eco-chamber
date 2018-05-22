import React, { Component } from 'react';
import moment from 'moment';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state= {
      selected: false
    }
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(e) {
    let currentState = this.state.selected;
    this.setState({ selected: !currentState }, ()=> this.props.toggleArticle(this.state.selected, this.props.article));  
  }

  render() {
    return ( 
      <div onClick={this.toggleSelected} className={this.state.selected ? 'article article-selected' : 'article'}>
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