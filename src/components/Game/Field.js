import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Field = ({ fieldLength, delay, start, stopPlay }) => {
  const [randomItemArray, setRandomItemArray] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [computersItems, setComputersItems] = useState([]);
  const [square, setSquare] = useState([]);
  const [randomSquare, setRandomSquare] = useState([]);
  const [usersClick, setUsersClick] = useState(false);

  const handleClick = e => {
    const select = +e.target.dataset.index;
    const lastRandomItem = randomItemArray[randomItemArray.length - 1];
    setUsersClick(true);
    if (select === lastRandomItem
        && lastRandomItem >= 0
        && !usersClick
      ) {
      const tmpArray = userItems;
      tmpArray.push(lastRandomItem);
      setUserItems(tmpArray);
    } else if (lastRandomItem >= 0 && !usersClick) {
      const tmpArray = computersItems;
      tmpArray.push(lastRandomItem);
      setComputersItems(tmpArray);
    };
    if (userItems.length === Math.ceil(square.length / 2)) stopPlay('user');
    if (computersItems.length === Math.ceil(square.length / 2)) stopPlay('computer');
  }

  const fetRandomNumber = (min, max) => {
    let random = min - 0.5 + Math.random() * (max - min + 1);
    random = Math.round(random);
    return random;
  };

  useEffect(() => {
    const array = [];
    for (let i = 0; i < fieldLength * fieldLength; i++) array[i] = i;
    setSquare(array);
    setRandomSquare(array);
  }, [fieldLength, start]);

  useEffect(() => {
    let timeout;
    if (start && randomSquare.length) {
      setUsersClick(false);
      timeout = setTimeout( () => {
        let random = randomSquare[fetRandomNumber(0, randomSquare.length-1)];
        const tmpAr = randomItemArray.slice();
        tmpAr.push(random);
        setRandomItemArray(tmpAr);
        let newSquare = randomSquare.filter(num => +random !== +num);
        setRandomSquare(newSquare);
      }, delay);
      if (userItems.length === Math.ceil(square.length / 2)) stopPlay('user');
      if (computersItems.length === Math.ceil(square.length / 2)) stopPlay('computer');
    };
    if (!start) {
      setComputersItems([]);
      clearTimeout(timeout);
      setUserItems([]);
      setUsersClick(false);
      setRandomItemArray([]);
    }
  }, [randomSquare]);

  useEffect(() => {
    if (!usersClick && randomItemArray.length > 1) {
      const tmpArray = computersItems;
      tmpArray.push(randomItemArray[randomItemArray.length - 2]);
      setComputersItems(tmpArray);
      setUsersClick(false);
    } else {
      setUsersClick(false);
    }
  }, [randomItemArray]);

  const forIn = (numb) => {
    let classname = '';
    userItems.forEach(num => {
      if(num === numb && start) classname =  'green';
    });
    computersItems.forEach(num => {
      if(num === numb && start) classname = 'red';
    });
    return classname;
  }
  return(
    <div className="field">
      <div
        className="field_container"
        style={{width:`${34 * fieldLength}px`, height:`${34 * fieldLength}px`}}
      >
        {square.map((val, index) => (
          <div
            className={`field_item ${(randomItemArray[randomItemArray.length - 1] === index) && start ? 'blue' : ''} ${forIn(index)} `}
            key={`item${index}`}
            style={{width: `${100 / fieldLength}%`, height: `${100 / fieldLength}%`}}
            data-index={index}
            onClick={handleClick}
          />
        ))
        }
      </div>
    </div>
  )
};

export default Field;

Field.propTypes = {
  fieldLength: PropTypes.number
};
