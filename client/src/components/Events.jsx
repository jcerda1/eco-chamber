import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import moment from 'moment';
var FaStarO = require('react-icons/lib/fa/star-o');
var FaHeartC = require('react-icons/lib/fa/star');
var FaLineChart = require('react-icons/lib/fa/line-chart');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    this.updateEvents();
  }
 
  componentWillReceiveProps(props) {
    this.updateEvents(props);
  }

  updateEvents = (props = this.props) => {
    const { categoryId } = props.match.params;
    Api.get('/events', { categoryId }).then(events => this.setState({ events }));
  }

  onClick = (e, eventId) => {
    Api.post('/users/user-events', { eventId });
  }

  render() {
    const events = this.state.events.map(({ id, title, summary, date, Articles }) => {
      let formatted = moment(date).fromNow();

      return (
        <div>
          <li className="event-item" key={id}>
            <Link style={{"textDecoration": "none", "color": "black", "padding": "10px"}} to={{
              pathname: `/event/${id}/articles`,
              state: { title, date }}}>

            <h2  className="li-header">
              {title}
            </h2>
            <p>{formatted}</p>
            </Link>
            
            <div className="event-list-item-right">      
              <div value={id} className="event-text">
                <p>
                  {summary}
                </p>
              </div>

              <div className = "event-icons">
                <FaLineChart className="event-chart-icon"/>
                <FaStarO className="event-star-icon" onClick={(e) => { this.onClick(e, id) }}/>
              </div>
            </div>    
          </li>
        <hr/>
      </div>

      );
    });
  
    return (
      <ul className="events-container">
        {events}
      </ul>
    );
  }
}

export default Events;
