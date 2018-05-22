import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = word => word.value / 10;
const rotate = word => (word.value % 90) - 45;

class EventWordCloud extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WordCloud
        width={500}
        height={300}
        data={this.props.data}
        fontSizeMapper={fontSizeMapper}
        padding={2}
      />
    );
   } 
};

export default EventWordCloud