import React, { Component } from 'react';
import Api from '../helpers/Api';
import Auth from '../helpers/Auth';
import EventList from './EventList.jsx';

class TopEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      selected: null,
      savedEvents: [],
    };
  }

  componentDidMount() {
    this.updateEvents();
    this.getSavedEvents();
  }

  componentWillReceiveProps(props) {
    this.updateEvents(props);
  }

  updateEvents = (props = this.props) => {
    let { query } = props.match.params;
    Api.get('/events/search', { query }).then(events => this.setState({ events }));
  }

  getSavedEvents() {
    if (Auth.getJWT()) {
      Api.get('/users/user-events').then(savedEvents => this.setState({ savedEvents }));
    } 
  }

  removeSaved = (e, eventId) => {  
    Api.delete('/users/user-events', { eventId }).then(res => this.getSavedEvents());
  }

  saveEvent = (e, eventId) => {
    Api.post('/users/user-events', { eventId }).then(res => this.getSavedEvents());
  }

  closeModal() {
    this.setState({ selected: null});
  }

  showModal(id) {
    this.setState({ selected: id});
  }

  render() { 
    return (
      <ul className="events-container">
        <EventList 
          title="Search Results"
          selected={this.state.selected}
          open={this.showModal} 
          close= {this.closeModal} 
          add={this.saveEvent} 
          remove={this.removeSaved} 
          saved={this.state.savedEvents} 
          events={this.state.events} 
        />
      </ul>
    );
  }
}

export default TopEvents;