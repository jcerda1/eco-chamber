import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import Sources from './Sources.jsx';
import ArticleList from './ArticleList.jsx';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedSources: []
    };
  }

  componentDidMount() {
    let { eventId } = this.props.match.params;
    Api.get('/sources', { eventId }).then(sources => {
      this.orderSources(sources);
    });
  } 

  orderSources (allSources) {
    let farLeft = allSources.filter(source => source.bias === -2).sort((a, b) => a.Articles.length < b.Articles.length);
    let left = allSources.filter(source => source.bias === -1).sort((a, b) => a.Articles.length < b.Articles.length);
    let center = allSources.filter(source => source.bias === 0).sort((a, b) => a.Articles.length < b.Articles.length);
    let right = allSources.filter(source => source.bias === 1).sort((a, b) => a.Articles.length < b.Articles.length);
    let farRight = allSources.filter(source => source.bias === 2).sort((a, b) => a.Articles.length < b.Articles.length);
    
    this.setState({ "orderedSources": [ farLeft, left, center, right, farRight] }, () => console.log('sources ordered', this.state));
  }

  render() {
    const sources = this.state.orderedSources.map(x => {
      return (
        <li key={x[0].bias}>
          <Sources sources={x}/>
        </li>
      )
    });

    return (
      <div>
        <h1 className="event-title">{this.props.location.state.title}</h1>
        <ul  className="articles-container">
          {sources}
        </ul>
      </div>
    );
  }
}

export default Event;