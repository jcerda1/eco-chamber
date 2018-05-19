import React, { Component } from 'react';

class Source extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props.source;
    const { image } = this.props.source;

    return (
      <div className="source-image-title">
        <img src={image}></img>
        <h2>{title}</h2>
      </div>
    );
  }
}

export default Source;