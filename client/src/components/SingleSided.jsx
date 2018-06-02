import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../helpers/Api';
import EventList from './EventList.jsx';

class SingleSided extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      selected: null,
      savedEvents: [],
      bias: 'left'
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getSavedEvents = this.getSavedEvents.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.updateEvents(this.props);
    this.getSavedEvents();
  }

  componentWillReceiveProps(props) {
    this.updateEvents(this.props);
  }

  updateEvents = () => {
    const { bias } = this.state;
    Api.get('/events/single-sided', { bias }).then(events => this.setState({ events }));
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

  handleClick(e) {
    this.setState({events: []}, () => {
      let current = this.state.bias;
      let bias = current === 'left' ? 'right' : 'left';
      this.setState({ bias }, () => this.updateEvents());
    });  
  }

  render() {
    const show = this.state.events.length === 0 
      ? (<div className="loading"><div className="loading-spinner"></div></div>)
      : (          
          <EventList 
            selected={this.state.selected}
            open={this.showModal} 
            close= {this.closeModal} 
            remove={this.removeSaved} 
            saved={this.state.savedEvents} 
            events={this.state.events} 
        />    
    );

    return (
      <ul className="events-container">
        <div className="toggle-bias">
          <div onClick={this.handleClick} className={this.state.bias === 'left' ? "left selected-bias" : "left"}>LEFT ONLY</div>
          <h1> Single Sided Events</h1>
          <div onClick={this.handleClick} className={this.state.bias === 'right' ? "right selected-bias" : "right"}>RIGHT ONLY</div>
        </div>
        {show}
      </ul>

    )
  }
};

export default SingleSided;
