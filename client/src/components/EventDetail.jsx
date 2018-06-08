import React, { Component } from 'react';
import Api from '../helpers/Api';
import moment from 'moment';
import EventSentimentRadarChart from './EventSentimentRadarChart.jsx';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { left: {}, right: {}, center: {} };
  }

  componentDidMount() {
    let { eventId } = this.props;
    Api.get('/eventSentiment', { eventId }).then(sentiments => {
      this.setState({ left: sentiments.left , right: sentiments.right, center: sentiments.center });  
    }); 
  }

  render() {
    return (
      <div className="event-detail">     
        <h1>{this.props.title}</h1>
        <h2>REPORTING SOURCES HERE</h2>
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
