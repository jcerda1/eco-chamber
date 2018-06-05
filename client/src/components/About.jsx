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
          <iframe width="560" height="315" src="https://www.youtube.com/embed/mh1dLvGe06Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>

        <div className="mission">
          <h1>Step into the eco-chamber</h1>
          <div className="statements">
            <div className="statement">
              <p>News events reported on across the entire polical spectrum</p>
            </div>
            <div className="statement">
              <p>View which events are being reported on by only one political side</p>
            </div>
            <div className="statement">
              <p>Give feedback about article bias</p>
            </div>
            <div className="statement">
              <p>Test your filter bubble by playing our game</p>
            </div>
          </div>
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
