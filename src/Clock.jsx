import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { getHours, getMinutes, getSeconds } from '@wojtekmaj/date-utils';

import Hand from './Hand';
import Mark from './Mark';

import {
  isHandLength,
  isOppositeHandLength,
  isHandWidth,
  isMarkLength,
  isMarkWidth,
} from './shared/propTypes';

export default function Clock({
  backgroundColor = '#fff',
  className,
  hourHandLength = 50,
  hourHandOppositeLength,
  hourHandWidth = 4,
  hourMarksLength = 10,
  hourMarksWidth = 3,
  minuteHandLength = 70,
  minuteHandOppositeLength,
  minuteHandWidth = 2,
  minuteMarksLength = 6,
  minuteMarksWidth = 1,
  newUI = false,
  numbersMultiplier = 1,
  preciseSecondHandAngle = false,
  renderHourMarks = true,
  renderHourHand = true,
  renderMinuteHand = true,
  renderMinuteMarks = true,
  renderNumbers,
  renderSecondHand = true,
  secondHandLength = 90,
  secondHandOppositeLength,
  secondHandWidth = 1,
  size = 150,
  value,
}) {
  function renderMinuteMarksFn() {
    if (!renderMinuteMarks) {
      return null;
    }

    const minuteMarks = [];
    for (let i = 1; i <= 60; i += 1) {
      const isHourMark = renderHourMarks && !(i % 5);

      if (!isHourMark) {
        minuteMarks.push(
          <Mark
            key={`minute_${i}`}
            angle={i * 6}
            length={minuteMarksLength}
            name="minute"
            newUI={newUI}
            width={minuteMarksWidth}
          />,
        );
      }
    }
    return minuteMarks;
  }

  function renderHourMarksFn() {
    if (!renderHourMarks) {
      return null;
    }

    const hourMarksLength = getHourMarksLength();
    const hourMarks = [];
    for (let i = 1; i <= 12; i += 1) {
      hourMarks.push(
        <Mark
          key={`hour_${i}`}
          angle={i * 30}
          length={hourMarksLength}
          name="hour"
          newUI={newUI}
          number={renderNumbers ? (i * numbersMultiplier) : null}
          width={hourMarksWidth}
        />,
      );
    }
    return hourMarks;
  }

  function renderInnerRing() {
    return <div className="react-clock__face-inner-ring" />;
  }

  function renderFace() {
    if (newUI) {
      return (
        <>
          {renderInnerRing()}
          {renderViviLogo()}
          <div className="react-clock__face-outer" style={{ backgroundColor }}>
            <div className="react-clock__face-inner">
              {renderMinuteMarksFn()}
              {renderHourMarksFn()}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="react-clock__face">
          {renderMinuteMarksFn()}
          {renderHourMarksFn()}
        </div>
      );
    } 
  }

  function renderHourHandFn() {
    if (!renderHourHand) {
      return null;
    }

    const angle = value ? (
      (getHours(value) * 30)
      + (getMinutes(value) / 2)
      + (getSeconds(value) / 600)
    ) : 0;

    return (
      <Hand
        angle={angle}
        length={hourHandLength}
        name="hour"
        oppositeLength={hourHandOppositeLength}
        width={hourHandWidth}
      />
    );
  }

  function renderMinuteHandFn() {
    if (!renderMinuteHand) {
      return null;
    }

    const angle = value ? (
      (getHours(value) * 360)
      + (getMinutes(value) * 6)
      + (getSeconds(value) / 10)
    ) : 0;

    return (
      <Hand
        angle={angle}
        length={minuteHandLength}
        name="minute"
        oppositeLength={minuteHandOppositeLength}
        width={minuteHandWidth}
      />
    );
  }

  function renderSecondHandFn() {
    if (!renderSecondHand) {
      return null;
    }

    const milliseconds = preciseSecondHandAngle ? value.getMilliseconds() / 1000 : 0;
    const angle = value ? (
      (getMinutes(value) * 360)
      + ((getSeconds(value) + milliseconds) * 6)
    ) : 0;

    return (
      <Hand
        angle={angle}
        length={secondHandLength}
        name="second"
        oppositeLength={secondHandOppositeLength}
        newUI={newUI}
        width={secondHandWidth}
      />
    );
  }

  function renderViviLogo() {
    return (
      <svg
        fill="none"
        height="33"
        style={{ transform: `translateX(calc(${size / 2}px - 50%)) translateY(calc(-${size / 8}px - 50%))` }}
        viewBox="0 0 32 33"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2539 16.9656C22.2043 16.9656 22.1448 16.9062 22.1448 16.9062H22.1548L20.014 13.5266C19.9843 13.4672 20.0438 13.3581 20.0438 13.3581L29.0229 6.03413C29.0724 5.99448 29.1319 5.99448 29.1815 6.03413C29.2211 6.07377 29.231 6.14314 29.2013 6.1927L22.3629 16.9062C22.3332 16.9458 22.2539 16.9656 22.2539 16.9656ZM16.1688 16.8071L20.3015 20.1768V20.1668C20.3511 20.2065 20.361 20.2858 20.3313 20.3353L16.1291 26.926C16.0994 26.9656 16.0201 26.9854 16.0201 26.9854C15.9705 26.9854 15.9111 26.926 15.9111 26.926L2.84876 6.25221C2.80911 6.20265 2.82894 6.13328 2.86858 6.09363C2.90822 6.05399 3.02715 6.09363 3.02715 6.09363L16.03 16.6981L16.1688 16.8071Z" fill="#282828"/>
      </svg>
    );
  }

  function getFontSize() {
    if (size < 350) {
      return 18;
    } else if (size < 400) {
      return 24;
    }

    return 32;
  }

  function getHourMarksLength() {
    if (!newUI) {
      return hourMarksLength;
    }

    if (size < 350) {
      return Math.min(10, hourMarksLength);
    } else if (size < 450) {
      return Math.min(20, hourMarksLength);
    }

    return Math.min(30, hourMarksLength);
  }

  return (
    <time
      className={`${mergeClassNames('react-clock', className)} ${newUI ? 'newUI' : ''}`}
      dateTime={value instanceof Date ? value.toISOString() : value}
      style={{
        fontSize: `${getFontSize()}px`,
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      {renderFace()}
      {renderHourHandFn()}
      {renderMinuteHandFn()}
      {renderSecondHandFn()}
    </time>
  );
}

Clock.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  hourHandLength: isHandLength,
  hourHandOppositeLength: isOppositeHandLength,
  hourHandWidth: isHandWidth,
  hourMarksLength: isMarkLength,
  hourMarksWidth: isMarkWidth,
  minuteHandLength: isHandLength,
  minuteHandOppositeLength: isOppositeHandLength,
  minuteHandWidth: isHandWidth,
  minuteMarksLength: isMarkLength,
  minuteMarksWidth: isMarkWidth,
  numbersMultiplier: PropTypes.number,
  preciseSecondHandAngle: PropTypes.bool,
  renderHourHand: PropTypes.bool,
  renderHourMarks: PropTypes.bool,
  renderMinuteHand: PropTypes.bool,
  renderMinuteMarks: PropTypes.bool,
  renderNumbers: PropTypes.bool,
  renderSecondHand: PropTypes.bool,
  secondHandLength: isHandLength,
  secondHandOppositeLength: isOppositeHandLength,
  secondHandWidth: isHandWidth,
  size: PropTypes.number,
  value: PropTypes.instanceOf(Date),
};
