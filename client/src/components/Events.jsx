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
    const events = this.state.events.map(({ id, title }) => {
      return (
        <li key={id}>
          <Link to={`/event/${id}/articles`}>
            {title}
          </Link>
        </li>
      );
    });
  
    return (
      <ul>
        {events}
      </ul>
    );
  }
}

export default Events;




// import React from 'react';


// const Events = (props) => {
//   return (
//     <ul className="events-container">
//       {props.events}
//     </ul> 
//   )
// }
 

// export default Events;    