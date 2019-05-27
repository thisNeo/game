import React, { memo } from 'react';
import { Segment } from 'semantic-ui-react';


import './style.scss';

const Board = ({ winnersList }) => (
  <div className="board">
    <Segment className="board_container">
      <h2 className="board_title">Leader Board</h2>
      <div className="winnersList">
        {
          winnersList.map(({winner, date, id}) => (
            <div key={id} className="winner">
              <span className="winner_name">{winner}</span>
              <span className="winner_date">{date}</span>
            </div>
          ))
        }
      </div>
    </Segment>
  </div>
);

export default memo(Board);
