import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
var ArrowsH= require('react-icons/lib/fa/arrows-h');
var BarChart = require('react-icons/lib/fa/bar-chart');
var BalanceScale = require('react-icons/lib/fa/balance-scale');
var BubbleChart = require('react-icons/lib/md/bubble-chart');
var Swap = require('react-icons/lib/md/swap-horiz')

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about-page">
        <div className="about">
          <h1>Get out of the echo chamber</h1>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/mh1dLvGe06Y" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>

        <div className="mission">
          <h1>Step into the eco-chamber</h1>
          <div className="statements">
            <div className="statement">
            <BalanceScale className="statement-icon"/>
              <h3>News events reported on across the entire polical spectrum</h3>
            </div>
            <div className="statement">
              <Swap className="statement-icon"/>
              <h3>News events reported by only one side of the spectrum</h3>
            </div>
            <div className="statement">
              <BarChart className="statement-icon"/>
              <h3>Give feedback about article bias</h3>
            </div>
            <div className="statement">
              <BubbleChart className="statement-icon"/>
              <h3>Test your filter bubble by playing our game</h3>
            </div>
          </div>
        </div>

        <div className="faq">
          <h1>FAQ</h1>
          <div className="questions">
            <div className="question">
              <h3>How do you choose which outlets are right, left, or center?</h3>
              <div className="response">
                <p>We use the ratings by <a target="_blank" href="https://www.allsides.com/media-bias/media-bias-ratings">AllSides</a></p>
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
              <h3>Alex Wells</h3>
              <p className="bio-photo">photo here</p>
              <p className="bio-text">about alex here</p>
            </div>
            <div className="bio">
              <h3>Jeremiah Cerda</h3>
              <a target="_blank" href="https://github.com/jcerda1"><img className="profile-photo" src="https://avatars2.githubusercontent.com/u/28033088?s=400&v=4"/></a>
              
            </div>
            <div className="bio">
              <h3>Michelle Lockett</h3>             
              <a target="_blank" href="https://github.com/michellelockett"><img className="profile-photo" src="https://avatars2.githubusercontent.com/u/19374552?s=460&v=4"/></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
