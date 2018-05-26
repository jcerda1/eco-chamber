import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../helpers/Api';

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      hoverIndex: -1,
    };
  }

  componentDidMount() {
    Api.get('/users/user-events').then(events => {
      this.setState({ events });
    });
  }

  onMouseEnter = (e, i) => {
    this.setState({ hoverIndex: i });
  }

  onMouseLeave = (e) => {
    this.setState({ hoverIndex: -1 });
  }

  onClick = (e, eventId) => {
    Api.delete('/users/user-events', { eventId }).then(events => {
      this.setState({ events });
    });
  }

  render() {
    const events = this.state.events.map(({ id, title, date }, i) => {
      const formattedDate = moment(date).fromNow();

      const deleteButton = this.state.hoverIndex === i
        ? <button onClick={(e) => { this.onClick(e, id) }} style={{ "height":"16px", "width":"50px" }}>delete</button>
        : null;

      return (
        <li key={id} onMouseEnter={(e) => { this.onMouseEnter(e, i) }} onMouseLeave={(e) => { this.onMouseLeave(e, i) }}>
          <Link to={`/event/${id}/articles`} style={{ "color": "black" }}>
            {title}
          </Link>
          {deleteButton}
        </li>
      );
    });

    return (
      <ul>
        {events}
      </ul>
    );
  }
};

export default MyEvents;
