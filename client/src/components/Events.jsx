import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import moment from 'moment';
import EventDetail from './EventDetail.jsx';
var FaStarO = require('react-icons/lib/fa/star-o');
var FaHeartC = require('react-icons/lib/fa/star');
var FaLineChart = require('react-icons/lib/fa/line-chart');
var FaClose = require('react-icons/lib/fa/close');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false
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
    const { categoryId } = props.match.params;
    Api.get('/events', { categoryId }).then(events => this.setState({ events }));
  }

  onClick = (e, eventId) => {
    Api.post('/users/user-events', { eventId });
  }


  showModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false})
  }

  render() {
    const events = this.state.events.map(({ id, title, summary, date, Articles }) => {
      let formatted = moment(date).fromNow();

      return (
        <div key = {id}>
          <li className="event-item">
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
                <FaLineChart onClick={this.showModal} className="event-chart-icon"/>
                <FaStarO className="event-star-icon" onClick={(e) => { this.onClick(e, id) }}/>
              </div>

               <div className="modal" style={{ display: this.state.showModal ? 'block' : 'none' }}>
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
        {events}
      </ul>
    );
  }
}

export default Events;
