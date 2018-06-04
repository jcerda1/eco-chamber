import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about-page">
        <div className="about">
          <h1>Get out of the echo chamber</h1>
          <p>Description of what the echo chamber is here</p>
          <p>Description of what the eco-chamber is here</p>
        </div>

        <div className="mission">
          <h1>Our mission</h1>
          <p>Description of our mission here</p>
        </div>

        <div className="faq">
          <h1>FAQ</h1>
          <div className="questions">
            <div className="question">
              <h3>How do you choose which outlets are right, left, or center?</h3>
              <div className="response">
                <p>answer here</p>
              </div>

            </div>
            <div className="question">
              <h3>How do you choose the event titles and descriptions?</h3>
              <div className="response">
              <p>answer here</p>
              </div>
            </div>
            <div className="question">
              <h3>How are you deciding the event and article sentiment?</h3>
              <div className="response">
              <p>answer here</p>
              </div>
            </div>
            <div className="question">
              <h3>One more question to balance things out visually</h3>
              <div className="response">
              <p>answer here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="creators">
          <h1>Creators</h1>
          <div className="bios">
            <div className="bio">
              ALEX WELLS
              <p className="bio-photo">photo here</p>
              <p className="bio-text">about alex here</p>
            </div>
            <div className="bio">
              JEREMIAH CERDA
              <p className="bio-photo">photo here</p>
              <p className="bio-text">about jeremiah here</p>
            </div>
            <div className="bio">
              MICHELLE LOCKETT
              <p className="bio-photo">photo here</p>
              <p className="bio-text">about michelle here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
