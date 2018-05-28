import Api from '../helpers/Api';
import Chart from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';



class EventSentimentChartRadar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: {}, right: {}, center: {} };
  }

  componentDidMount() {
    let { eventId } = this.props;
    Api.get('/eventSentiment', { eventId }).then(sentiments => {
      this.setState({ left: sentiments.left , right: sentiments.right, center: sentiments.center });  
    }); 
  }
  render() {
    const leftData = this.state.left.sentiment 
      ? 
      {
        label: 'Left',
        backgroundColor: 'rgba(15, 27, 255, 0.2)',
        borderColor: 'rgba(15, 27, 255,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [this.state.left.fear, this.state.left.disgust, this.state.left.anger, this.state.left.sadness, this.state.left.joy]
      }
      : null; 

    const rightData = this.state.right.sentiment 
      ? 
      {
        label: 'Right',
        backgroundColor: 'rgba(255, 15, 27,0.2)',
        borderColor: 'rgba(255, 15, 27,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [this.state.right.fear, this.state.right.disgust, this.state.right.anger, this.state.right.sadness, this.state.right.joy]
      }
      : null; 

    const centerData = this.state.center.sentiment 
      ? 
      {
        label: 'Center',
        backgroundColor: 'rgba(0, 0, 0,0.2)',
        borderColor: 'rgba(0, 0, 0,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [this.state.center.fear, this.state.center.disgust, this.state.center.anger, this.state.center.sadness, this.state.center.joy]
      }
      : null; 

    const calculateDataSets = () => {
      let datasets = [];

      if (leftData) {
        datasets.push(leftData);
      }
      if (rightData) {
        datasets.push(rightData);
      }
      if (centerData) {
        datasets.push(centerData)
      }
      return datasets;
    }

    const data = {
      labels: ['fear', 'disgust', 'anger', 'sadness', 'joy'],
      datasets: calculateDataSets()
    };

    if (data.datasets.length > 0) {
      return (
        <div className='sentiment-chart'>
          <Radar data={data} />
        </div>    
      )
    } else {
      return (<div></div>)
    }
  }
};

export default EventSentimentChartRadar