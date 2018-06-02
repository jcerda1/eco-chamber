import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import moment from 'moment';
import EventDetail from './EventDetail.jsx';
import EventList from './EventList.jsx';
var FaStarO = require('react-icons/lib/fa/star-o');
var FaStarC = require('react-icons/lib/fa/star');
var FaLineChart = require('react-icons/lib/fa/line-chart');
var FaClose = require('react-icons/lib/fa/close');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      selected: null,
      savedEvents: []
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getSavedEvents = this.getSavedEvents.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
  }

  componentDidMount() {
    this.updateEvents(this.props);
    this.getSavedEvents();
  }

  componentWillReceiveProps(props) {
    this.updateEvents(this.props);
  }

  updateEvents = (props = this.props) => {
    const { categoryId } = props.match.params;
    Api.get('/events', { categoryId }).then(events => this.setState({ events }));
  }

  getSavedEvents() {
    Api.get('/users/user-events').then(savedEvents => this.setState({ savedEvents }));
  }
  
  saveEvent = (e, eventId) => {  
    Api.post('/users/user-events', { eventId }).then(res => this.getSavedEvents());
  }

  removeSaved = (e, eventId) => {  
    Api.delete('/users/user-events', { eventId }).then(res => this.getSavedEvents());
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

export default Events;
