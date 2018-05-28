import React, { Component } from 'react';
import moment from 'moment';
import EventSentimentRadarChart from './EventSentimentRadarChart.jsx';

class EventDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.selected); 

    return (  

      <div className="event-detail">     
        <h1> Information about this event </h1>  
        <EventSentimentRadarChart eventId={this.props.eventId} />   
      </div>     
    )
  }
}

export default EventDetail;