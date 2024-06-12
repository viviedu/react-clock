import React from 'react';
import PropTypes from 'prop-types';

import { isMarkLength, isMarkWidth } from './shared/propTypes';

export default function Mark({
  angle = 0,
  length = 10,
  name,
  newUI = false,
  width = 1,
  number,
}) {
  const bodyStyle = {
    width: `${width}px`,
    top: 0,
    bottom: `${100 - (length / 2)}%`,
  };

  const bodyStyleNewUI = {
    height: `0.9em`,
    width: `0.14em`,
    top: '0.3em'
  };


  const numberTopStyle = newUI ? `1.4em` : `${length / 2}%`;
  return (
    <div
      className={`react-clock__mark react-clock__${name}-mark`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div
        className={`react-clock__mark__body react-clock__${name}-mark__body`}
        style={newUI ? bodyStyleNewUI : bodyStyle}
      />
      {number && (
        <div
          className="react-clock__mark__number"
          style={{
            transform: `rotate(-${angle}deg)`,
            top: numberTopStyle
          }}
        >
          {number}
        </div>
      )}
    </div>
  );
}

Mark.propTypes = {
  angle: PropTypes.number,
  length: isMarkLength,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  width: isMarkWidth,
};
