import React, { Component } from 'react';
import Api from '../helpers/Api';
import WordMap from './WordMap.jsx';
import analyzeArticleTitles from '../helpers/WordMap.js';

class Gameboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEventId: '',
      events: [],
      sources: [],
      articles: [],
      weightedWords: [],
      selectedEvent: {},
      selectedArticle: [],
      eventId: 0,
      articleIndex: 0,
      completed: false,
      correct: null,
      score: {
        left: {
          correct: 0,
          incorrect: 0
        },
        right: {
          correct: 0,
          incorrect: 0
        },
        center:{
          correct: 0,
          incorrect: 0
        } 
      }      
    };

    this.setSources = this.setSources.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.setArticles = this.setArticles.bind(this);
    this.getWordMapData = this.getWordMapData.bind(this);
    this.newArticle = this.newArticle.bind(this);
    this.randomizeArticles = this.randomizeArticles.bind(this);
    this.finishedGame = this.finishedGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeArticle = this.handleChangeArticle.bind(this);
  }

 componentDidMount() {
   Api.get('/gameEvents').then(events => {
     this.setState({ events, selectedEvent: events[0] }, () => {
      this.setEvent(events[0].id);
      this.setSources(0);
    });
   }); 
  } 

  newArticle() {
    let current = this.state.articleIndex;
    let newIndex = current === this.state.articles.length -1 ? 0 : current + 1;
    if (newIndex === 0) {
      this.finishedGame();
    } else {
       this.setState({articleIndex: newIndex, selectedArticle: this.state.articles[newIndex], correct: null});
    }  
  }

  finishedGame() {
    this.setState({finished: true});
  }

  setEvent(eventId) {
    let event = this.state.events.filter(event => event.id === eventId)[0];
   
    let score = { left: {correct:0, incorrect:0}, right: {correct:0, incorrect: 0}, center: {correct: 0, incorrect: 0}};
    this.setState({ finished: false, selectedEvent: event, score, eventId: event.id }, () =>  {
      this.getWordMapData(event.Articles);
      this.setArticles("all");
    });
  }

  setSources(index) {
    let event = this.state.events[index];
    let sources = [... new Set(event.Articles.map(article => article.Source.image))];
    this.setState({ sources: sources });
  }

  setArticles(numArticles) {
    let event = this.state.selectedEvent;
    let articles = this.randomizeArticles(event.Articles);
    if (numArticles !== "all") {
      articles = articles.slice(0, parseInt(numArticles));
    }
    this.setState({ articles, selectedArticle: articles[0] }); 
  }

  getWordMapData(articles) {
    const data = analyzeArticleTitles(articles);
    this.setState({ titleWords: data.words, weightedWords: data.weighted });
  }

  randomizeArticles(articles) {
    
    var currentIndex = articles.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = articles[currentIndex];
      articles[currentIndex] = articles[randomIndex];
      articles[randomIndex] = temporaryValue;
    }

    return articles;
  }

  calculateBias(spectrum) {

    let sources = {
      left: [-1, -2],
      right: [1, 2],
      center: [0]
    };

    let currentScore = this.state.score;

    if (sources[spectrum].includes(this.state.articles[this.state.articleIndex].Source.bias)) {
      currentScore[spectrum].correct = currentScore[spectrum].correct + 1;
      this.setState({correct: true, score: currentScore});
    } else {
      currentScore[spectrum].incorrect = currentScore[spectrum].incorrect + 1;
      this.setState({correct: false, score: currentScore});
    }
  }

  handleChange(event) {
    this.setState({currentEventId: event.target.value}, () => this.setEvent(parseInt(this.state.currentEventId)));
  }

  handleChangeArticle(event) {
    this.setArticles(event.target.value);  
  }

  render() {
   
    const eventOptions = this.state.events.map((event) => <option key={event.id} value={event.id}>{event.title}</option>);

    const correct = this.state.correct === true
      ? (
        <div className="correct">
          <h3>Correct!</h3>
          <img src={this.state.selectedArticle.Source.image}></img>
          <p>{this.state.selectedArticle.Source.title}</p>
        </div>
        )
      : this.state.correct === false ? (<div id="try-again">Try Again</div>)
      : (<div></div>)

     const finished = this.state.finished 
      ? (<h1>YOU ARE FINISHED! Data on your score here</h1>)
      : (<div className="game-article">
          {this.state.selectedArticle.title}
          <button onClick={this.newArticle}>Next Article</button>  
          {correct}
          </div>) 

    return this.state.events.length === 0 
      ? (<div className="loading"><div className="loading-spinner"></div></div>) 
      : (
        <div className="game-board">
          <div className ="game-titles">
             <div className="game-title">
               <h1>EVENT</h1>
               <form>
                  <label>
                    Select Event:
                    <select value={this.state.value} onChange={(e) => this.handleChange(e)}>
                      {eventOptions}
                    </select>
                  </label>
                </form>
             </div>
             <div className="game-title">
              <h1>ARTICLE</h1>
              <form>
                  <label>
                    Select Game Length:
                    <select value={this.state.numArticles} onChange={this.handleChangeArticle}>
                      <option value="all">All articles ({this.state.selectedEvent.Articles.length})</option> 
                      <option value="5">5 articles</option>
                      <option value="10">10 articles</option>
                      <option value="15">15 articles</option>                                         
                    </select>
                  </label>
                </form>            
             </div>
          </div>
          <div className="game-top">
            <WordMap width="450" height="300" className="word-map" data={this.state.weightedWords}/>             
            {finished}
          </div> 
          <div className="game-bottom">
            <div onClick={() => this.calculateBias('left')} className="game-bias left">LEFT</div>
            <div onClick={() => this.calculateBias('center')} className="game-bias center">CENTER</div>
            <div onClick={() => this.calculateBias('right')} className="game-bias right">RIGHT</div>
          </div>
        </div>
      )  
  }

}

export default Gameboard;