import React, { Component } from 'react';
import Api from '../helpers/Api';
import moment from 'moment';
import EventSentimentRadarChart from './EventSentimentRadarChart.jsx';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { left: {}, right: {}, center: {}, articles: [], sources:[] };
  }

  componentDidMount() {
    let { eventId } = this.props;
    Api.get('/eventSentiment', { eventId }).then(sentiments => {
      this.setState({ left: sentiments.left , right: sentiments.right, center: sentiments.center });  
    }); 
    Api.get('/events/articles', { eventId }).then(event => {
      let sources = this.extractSources(event.Articles);
      this.setState({articles: event.Articles, sources: sources}, ()=> console.log(this.state));
    });
  }

  extractSources(articles) {
    let sourceUris = [];
    let sources = [];

    for (const article of articles) {
      if (!sourceUris.includes(article.Source.uri)) {
        let source = {image: article.Source.image, title: article.Source.title};
        sourceUris.push(article.Source.uri);
        sources.push(source);
      }
    }
    return sources;
  }

  render() {
    const sources = this.state.sources.map(source => {
      return (
        <div key={source.id} className="event-source">
          <img src={source.image}></img>
          <h3>{source.title}</h3>
        </div>
      )
    })

    return (
      <div className="event-detail">     
        <h1>{this.props.title}</h1>
        <h2>REPORTING SOURCES</h2>

        <div className="event-sources">
          {sources}
        </div>

        <div className="event-charts">
          <div className="event-radar">
            <h2>EVENT EMOTION ANALYSIS</h2>
            <EventSentimentRadarChart 
              left={this.state.left} 
              right={this.state.right}
              center={this.state.center}
              eventId={this.props.eventId} />
          </div> 

          <h2>LABEL DATA HERE</h2> 
        </div>  
      </div>     
    );
  }
}

export default EventDetail;
