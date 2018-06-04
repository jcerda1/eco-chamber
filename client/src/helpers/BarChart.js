
const formatDataForGameResults = (score) =>  {
  const left = {
    correct: (score.left.correct / (score.left.correct + score.left.incorrect))*100,
    incorrect: (score.left.incorrect / (score.left.correct + score.left.incorrect))*100,
  };

  const right = {
    correct: (score.right.correct / (score.right.correct + score.right.incorrect))*100,
    incorrect: (score.right.incorrect / (score.right.correct + score.right.incorrect))*100,    
  };

  const center = {
    correct: (score.center.correct / (score.center.correct + score.center.incorrect))*100,
    incorrect: (score.center.incorrect / (score.center.correct + score.center.incorrect))*100,
  }
    
  const data = {
    labels: ['Left', 'Center', 'Right'],
    datasets: [
      {
        label: 'Correct',
        backgroundColor: 'rgba(0, 128, 128, 0.2)',
        borderColor: 'rgba(0, 128, 228 ,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 128, 128, 0.4)',
        hoverBorderColor: 'rgba(0, 128, 128, 1)',
        data: [left.correct, center.correct, right.correct]
      },
       {
        label: 'Incorrect',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)',
        hoverBorderColor: 'rgba(0, 0, 0, 1)',
        data: [left.incorrect, center.incorrect, right.incorrect]
      }
    ]
  }
  return data;
};

export default formatDataForGameResults;


