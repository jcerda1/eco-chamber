import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Source from './Source.jsx';
import ArticleList from './ArticleList.jsx';

class Sources extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sourcesAll = this.props.sources.map(({ Articles, ...source }) => {
      return (
        <div key={source.id}>
          <Source source={source}/>
          <ArticleList articles={Articles}/>        
        </div>
      );
    });
  
    return (
      <div className="sources-list">
        {sourcesAll}
      </div>
    )
  }
}

export default Sources;
 