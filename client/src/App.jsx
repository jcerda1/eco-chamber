import React from 'react';
import styles from './styles.css';

class App extends React.Component {
  render() {
    console.log(process.env.db_port);

    return (
      <div>
        Eco-Chamber
      </div> 
    )  
  }; 
}

export default App;
