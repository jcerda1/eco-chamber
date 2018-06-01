import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import moment from 'moment';
import EventDetail from './EventDetail.jsx';
var FaStarO = require('react-icons/lib/fa/star-o');
var FaStarC = require('react-icons/lib/fa/star');
var FaLineChart = require('react-icons/lib/fa/line-chart');
var FaClose = require('react-icons/lib/fa/close');

class TopEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      selected: null
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.updateEvents();
  }
 
  componentWillReceiveProps(props) {
    this.updateEvents(props);
  }

  updateEvents = (props = this.props) => {
    Api.get('/topEvents').then(events => this.setState({ events }));
  }

  onClick = (e, eventId) => {
    Api.post('/users/user-events', { eventId });
  }

  closeModal() {
    this.setState({ selected: null})
  }

  showModal(id) {
    this.setState({ selected: id});
  }

  render() {
    const events = this.state.events.map(({ id, title, summary, date, Articles }) => {
      let formatted = moment(date).fromNow();

      return (
        <div className="event-list">
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
                <FaLineChart onClick={() => this.showModal(id)} className="event-chart-icon"/>
                <FaStarO className="event-star-icon" onClick={(e) => { this.onClick(e, id) }}/>
              </div>

              <div className="modal" style={{ display: this.state.selected === id ? 'block' : 'none' }}>
                <div className="modal-content">
                  <FaClose style={{"color":"darkgrey", "fontSize": 60}} onClick={this.closeModal}/>
                  <EventDetail eventId={id}/>
                </div>
              </div>
            </div>    
          </li>
        <hr/>
      </div>

      );
    });
  
    return (
      <ul className="events-container">
        <h1> This week's top events </h1>
        {events}
      </ul>
    );
  }
}

export default TopEvents;