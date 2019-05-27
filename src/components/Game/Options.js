import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Dropdown, Input, Button } from 'semantic-ui-react';

const Options = ({ enterMode, play, winner, stopPlay }) => {
  const [modes, setModes] = useState(false);
  const [mode, setMode] = useState({});
  const [value, setValue] = useState('');

  const handleSelectMode = (e, data) => {
    setMode(modes[data.value]);
    enterMode(modes[data.value]);
    stopPlay();
  };

  const handleChangeValue = (e, data) => setValue(data.value);

  const handlePlay = () => {
    if (value && mode) {
      play(value);
      setValue('');
    } else {
      alert('Заполните, пожалуйста, данные!')
    };
  };

  useEffect(() => {
  axios.get('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
    .then(res => setModes(res.data))
    .catch(err => console.log(err));
  }, []);

  const modesOptions = Object.keys(modes).map(mode => ({
    key: mode,
    value: mode,
    text: mode
  }));

  return (
    <div className="options">
      <div className="options_option">
        <Dropdown
          placeholder='Pick game mode'
          selection
          options={modesOptions}
          onChange={handleSelectMode}
        />
        <Input placeholder="Enter your name" onChange={handleChangeValue} value={value} />
        <Button onClick={handlePlay}>{winner === 'computer' ? 'PLAY AGAIN' : 'PLAY'}</Button>
      </div>
      <p
        className="options_message">{(winner&& winner !== 'computer')
          ? `${winner}, you won!`
          : ''
        }
      </p>
    </div>
  );
};

export default memo(Options);

Options.propTypes = {
  enterMode: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  winner: PropTypes.string.isRequired,
  stopPlay: PropTypes.func.isRequired
};
