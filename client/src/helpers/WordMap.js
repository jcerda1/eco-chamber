const analyzeArticleTitles = (articles) => {
  let ignoredWords = [
    'is','at','after', 'of', 'the', 'a', 'an', 'he', 
    'she', 'and', 'for', 'in', 'on', 'to', 'with', 'over', 'it', 'as', '|'
  ];
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
  return { words, weighted }
};

export default analyzeArticleTitles;