import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import EventList from './EventList.jsx';

class TopEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      selected: null,
      savedEvents: []
    };
    this.getSavedEvents = this.getSavedEvents.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.updateEvents();
    this.getSavedEvents();
  }

  updateEvents = (props = this.props) => {
    Api.get('/topEvents').then(events => this.setState({ events }));
  }

  getSavedEvents() {
    Api.get('/users/user-events').then(savedEvents => this.setState({ savedEvents }));
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
        <h1> This week's top events </h1>
          <EventList 
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