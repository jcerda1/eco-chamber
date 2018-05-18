import React, { Component } from 'react';

class Source extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props.source;

    return (
      <div className="source-image-title">
        <img src='https://seeklogo.com/vector-logo/6715/all-news'></img>
        <hr></hr>
        {title}
      </div>
    );
  }
}

export default Source;