import React from 'react';
import PropTypes from 'prop-types';

import { isHandLength } from './shared/propTypes';

export default function Hand({
  angle = 0,
  name,
  length = 100,
  oppositeLength = 10,
  newUI = false,
  width = 1,
}) {
  return (
    <div
      className={`react-clock__hand react-clock__${name}-hand`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div
        className={`react-clock__hand__body react-clock__${name}-hand__body`}
        style={{
          'box-shadow': 'inset 3px -3px 2px 0px rgba(0, 0, 0, 0.15), -3px 1px 5px 0px rgba(0, 0, 0, 0.2)',
          width: `${width}px`,
          top: `${50 - (length / 2)}%`,
          bottom: `${50 - (oppositeLength / 2)}%`,
          clipPath: (newUI && name === 'second') ? 'polygon(30% 0%,70% 0%,100% 100%,0% 100%)' : ''
        }}
      />
      {newUI && <div className='react-clock__hand__body__center' ></div>}
    </div>
  );
}

Hand.propTypes = {
  angle: PropTypes.number,
  length: isHandLength,
  name: PropTypes.string.isRequired,
  oppositeLength: isHandLength,
  width: PropTypes.number,
};
