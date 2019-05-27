import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Board from './components/Board';
import Game from './components/Game';

// import 'semantic-ui-css';
import './App.scss';

const App = () => {
  const [winnersList, setWinnersList] = useState([]);

  const updateWinnersList = (data, date) => {
    const body = {winner: data, date};
    axios.post('https://starnavi-frontend-test-task.herokuapp.com/winners', body)
      .then(res => setWinnersList(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get('https://starnavi-frontend-test-task.herokuapp.com/winners')
    .then(res => setWinnersList(res.data))
    .catch(err => console.log(err));
  }, []);
  return (
    <div className="app">
      <Game updateWinners={updateWinnersList} />
      <Board winnersList={winnersList} />
    </div>
  );
}

export default App;
