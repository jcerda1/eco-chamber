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
    // let allSources = await Api.get('/sources', { eventId });
    // await this.setState({"sources": allSosurces});
    // console.log(this.state);
  } 


  // componentWillReceiveProps(props) {
  //   this.updateSources(props);
  // }

  orderSources (allSources) {
    let farLeft = allSources.filter(source => source.bias === -2);
    let left = allSources.filter(source => source.bias === -1);
    let center = allSources.filter(source => source.bias === 0);
    let right = allSources.filter(source => source.bias === 1);
    let farRight = allSources.filter(source => source.bias === 2);
    
    this.setState({ "orderedSources": [ farLeft, left, center, right, farRight] }, () => console.log('sources ordered', this.state));
  }

  updateSources = (props = this.props) => {
    const { eventId } = props.match.params;
    Api.get('/sources', { eventId }).then(sources => {
      this.setState({ sources }, () => { 
        console.log('retrieved sources');
        this.orderSources();
      });
    });
  }

  render() {
    console.log(this.props)
    const sources = this.state.orderedSources.map(x => {
      return (
        <li>
          <Sources sources={x}/>
        </li>
      )
    })

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