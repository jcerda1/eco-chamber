import React, { Component } from 'react';
import EventCard from './EventCard.jsx';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sorted = this.props.events.sort((a, b) => a.date < b.date);
    let events;

    if (this.props.events.length === 0) {
      events = (<div></div>);
    } else {
      events = sorted.map(event => 
        <EventCard  
          event={event} 
          key={event.id}
          selected={this.props.selected}
          open={this.props.open}
          close={this.props.close}
          add={this.props.add}
          remove={this.props.remove}
          saved={this.props.saved.filter(x=> x.id === event.id).length > 0}
        />
     );
    }
     
    return (
      <div className="events-list">
        {events}
      </div>
    );
  }
}

export default EventList;