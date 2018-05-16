import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';

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
    const events = this.state.events.map(({ id, title, summary }) => {
      return (
        <li key={id}>
          <Link style={{"text-decoration": "none", "color": "black", "padding": "10px"}} to={`/event/${id}/articles`}>
            <h2  className="li-header">
              {title}
            </h2>
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
