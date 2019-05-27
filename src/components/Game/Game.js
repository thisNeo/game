import React, { useState } from 'react';
import moment from 'moment';

import Options from './Options';
import Field from './Field';

import './style.scss';

const Game = ({ updateWinners }) => {
  const [mode, setMode] = useState(false);
  const [start, setStart] = useState(false);
  const [winner, setWinner] = useState('');
  const [name, setName] = useState('');

  const handleEnterMode = mode => {
    setMode(mode);
  };

  const handlePlay = name => {
    setStart(!start);
    setWinner('');
    setName(name);
  };

  const stopGame = win => {
    setStart(false);
    if (win) {
      if (win !== 'computer') {
        setWinner(name);
        const newDate = new Date();
        const momentDate = moment(newDate).format('DD MMM YYYY');
        const momentTime = moment(newDate).format('H:mm');
        const date = `${momentTime}, ${momentDate}`;
        updateWinners(name, date);
      }
      else {
        setWinner('computer');
      };
    };
  };

  return (
    <div className="game">
      <div className="game_container">
        <Options
          enterMode={handleEnterMode}
          play={handlePlay}
          winner={winner}
          stopPlay={stopGame}
        />
        {mode.field &&
          <Field
          fieldLength={mode.field}
          delay={mode.delay}
          start={start}
          stopPlay={stopGame}
        />}
      </div>
    </div>
  )
};

export default Game;
