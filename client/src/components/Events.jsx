import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import moment from 'moment';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
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

  render() {
    const events = this.state.events.map(({ id, title, summary, date }) => {
      let formatted = moment(date).fromNow();
     
      return (
        <li key={id}>
          <Link style={{"textDecoration": "none", "color": "black", "padding": "10px"}} to={{
            pathname: `/event/${id}/articles`,
            state: { title, date }}}>

          <h2  className="li-header">
            {title}
          </h2>
          <p>{formatted}</p>
          </Link>
          
        
          <div value={id} className="body">
            <p>
              {summary}
            </p>
          </div>
        </li>
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
