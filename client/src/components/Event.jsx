import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';
import Sources from './Sources.jsx';
import ArticleList from './ArticleList.jsx';
import moment from 'moment';
import WordMap from './WordMap.jsx';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedSources: [],
      articles: [],
      titleWords:{},
      weightedWords: []
    };
  }

  componentDidMount() {
    let { eventId } = this.props.match.params;
    Api.get('/sources', { eventId }).then(sources => {
      this.orderSources(sources);
      this.getAllArticles(sources);
      this.analyzeArticleTitles(this.state.articles);   
    }); 
  } 

  getAllArticles(allSources) {
    let allArticles = [];
    for (const source of allSources) {
      allArticles = allArticles.concat(source.Articles);
    }
    this.setState({articles: allArticles});
  }

  analyzeArticleTitles(articles) {
    let ignoredWords = ['of', 'the', 'a', 'an', 'he', 'she', 'and', 'for', 'in', 'on', 'to', 'with', 'over', 'it', 'as', '|'];
    let words = {};
    let weighted = [];

    //get word frequency
    for (const article of articles) {
    
      let title = 
        article.title
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
          .replace(/\s{2,}/g," ")
          .split(' ').map(x => x.toLowerCase());

      for (const word of title) {
        if (!words[word] && !ignoredWords.includes(word)) {
          words[word] = 1;
        } else if (!ignoredWords.includes(word)) {
          words[word] ++;
        }
      }
    }

    //extract meaningful words
    for (const item in words) {
      if (words[item] > 1) {
        weighted.push({"text": item, "value": words[item] * 125});
      }

    }
    this.setState({ titleWords: words, weightedWords: weighted }, () => console.log(this.state));
  }

  orderSources (allSources) {
    let farLeft = allSources.filter(source => source.bias === -2).sort((a, b) => a.Articles.length < b.Articles.length);
    let left = allSources.filter(source => source.bias === -1).sort((a, b) => a.Articles.length < b.Articles.length);
    let center = allSources.filter(source => source.bias === 0).sort((a, b) => a.Articles.length < b.Articles.length);
    let right = allSources.filter(source => source.bias === 1).sort((a, b) => a.Articles.length < b.Articles.length);
    let farRight = allSources.filter(source => source.bias === 2).sort((a, b) => a.Articles.length < b.Articles.length);
    
    this.setState({ "orderedSources": [ farLeft, left, center, right, farRight] });
  }

  render() {
    const sources = this.state.orderedSources.map(x => {
      return (
        <li key={x[0].bias}>
          <Sources sources={x}/>
        </li>
      )
    });

    return (
      <div>
        <div className="word-map">
          <WordMap data={this.state.weightedWords}/>
        </div>
        
        <ul  className="articles-container">
          {sources}
        </ul>
      </div>
    );
  }
}

export default Event;