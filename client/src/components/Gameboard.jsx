import React, { Component } from 'react';
import Api from '../helpers/Api';
import WordMap from './WordMap.jsx';
import analyzeArticleTitles from '../helpers/WordMap.js';

class Gameboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      sources: [],
      articles: [],
      event: {},
      weightedWords: [],
      selected: [],
      eventIndex: 0,
      articleIndex: 0
    }

    this.setSources = this.setSources.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.setArticles = this.setArticles.bind(this);
    this.getWordMapData = this.getWordMapData.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.newArticle = this.newArticle.bind(this);
  }

 componentDidMount() {
   Api.get('/gameEvents').then(events => {
     this.setState({ events }, () => {
      this.setEvent(0);
      this.setSources(0);
      this.setArticles(0);
    });
   }); 
  } 

  newEvent() {
    let current = this.state.eventIndex;
    let newIndex = current === this.state.events.length -1 ? 0 : current + 1;
    this.setEvent(newIndex);
  }

  newArticle() {
    let current = this.state.articleIndex;
    let newIndex = current === this.state.articles.length -1 ? 0 : current + 1;
    this.setState({articleIndex: newIndex, selected: this.state.articles[newIndex]});
  }

  setEvent(index) {
    let event = this.state.events[index];
    this.setState({ event, eventIndex: index }, () =>  {
      this.getWordMapData(event.Articles);
      this.setArticles(0);
    });
  }

  setSources(index) {
    let event = this.state.events[index];
    let sources = [... new Set(event.Articles.map(article => article.Source.image))];
    this.setState({ sources: sources });
  }

  setArticles(articleIndex) {
    let event = this.state.events[this.state.eventIndex];
    let articles = event.Articles;
    this.setState({ articles, selected: articles[articleIndex] });
  }

  getWordMapData(articles) {
    const data = analyzeArticleTitles(articles);
    this.setState({ titleWords: data.words, weightedWords: data.weighted });
  }

  render() {

    return this.state.events.length === 0 
      ? (<div className="loading"><div className="loading-spinner"></div></div>) 
      : (
        <div className="game-board">
          <div className ="game-titles">
             <div className="game-title">
               <h1>EVENT</h1>
               <button onClick={this.newEvent}>Change Event</button>
             </div>
             <div className="game-title">
              <h1>ARTICLE</h1>
              <button onClick={this.newArticle}>Next Adticle</button>
             </div>
          </div>
          <div className="game-top">
            <WordMap className="word-map" data={this.state.weightedWords}/>             
            <div className="game-article">{this.state.selected.title}</div>             
          </div> 
          <div className="game-bottom">
            <div className="game-bias left">LEFT</div>
            <div className="game-bias center">CENTER</div>
            <div className="game-bias right">RIGHT</div>
          </div>
        </div>
      )  
  }

}

export default Gameboard;