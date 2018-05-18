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
        <hr></hr>
        {title}
      </div>
    );
  }
}

export default Source;