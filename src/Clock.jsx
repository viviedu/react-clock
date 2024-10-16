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


const DEFAULT_SIZE = 500;

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
  size = DEFAULT_SIZE,
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
          {renderClockFaceBackground()}
          {renderViviLogo()}
          {renderHourMarksFn()}
        </>
      );
    } else {
      return (
        <div className="react-clock__face" style={{ backgroundColor }}>
          {renderMinuteMarksFn()}
          {renderHourMarksFn()}
        </div>
      );
    } 
  }

  function renderClockFaceBackground() {
    return (
      <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501 501">
        <defs>
          <linearGradient id="linear-gradient" x1="98.94235" y1="448.57495" x2="401.94237" y2="54.57496" gradientTransform="translate(0 502) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset=".03631" stop-color="#efeeee"/>
            <stop offset=".49263" stop-color="#fff"/>
            <stop offset=".95817" stop-color="#eee"/>
            <stop offset="1" stop-color="#ddd"/>
          </linearGradient>
          <linearGradient id="linear-gradient-2" x1="88.80537" y1="432.91348" x2="416.80537" y2="64.9135" gradientTransform="translate(0 502) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset=".915" stop-color="silver"/>
          </linearGradient>
          <linearGradient id="linear-gradient-3" x1="-506.74243" y1="-341.02759" x2="12.25759" y2="45.97241" gradientTransform="translate(44 -76) rotate(-90) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="1" stop-color="#eee"/>
          </linearGradient>
          <linearGradient id="linear-gradient-4" x1="-431.59883" y1="-310.3156" x2="-156.08284" y2="-27.64358" gradientTransform="translate(48 -76) rotate(-90) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fefeff"/>
            <stop offset="1" stop-color="#b8b8b8"/>
          </linearGradient>
          <linearGradient id="linear-gradient-5" x1="-423.16688" y1="-92.01687" x2="-145.00587" y2="124.96811" gradientTransform="translate(234 -68) rotate(-90) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="1" stop-color="#eee"/>
          </linearGradient>
          <linearGradient id="linear-gradient-6" x1="-185.0686" y1="76.81581" x2="-469.5136" y2="-103.18423" gradientTransform="translate(238 -68) rotate(-90) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="silver"/>
            <stop offset=".5" stop-color="#e5e5e5"/>
            <stop offset="1" stop-color="silver"/>
          </linearGradient>
        </defs>
        <path class="cls-5" d="M250.5,0h0c138.34735,0,250.5,112.15266,250.5,250.5h0c0,138.34735-112.15265,250.5-250.5,250.5h0C112.15266,501,0,388.84735,0,250.5h0C0,112.15266,112.15266,0,250.5,0Z"/>
        <path class="cls-2" d="M250.5,2h0c137.24277,0,248.5,111.25723,248.5,248.5h0c0,137.24277-111.25723,248.5-248.5,248.5h0C113.25723,499,2,387.74277,2,250.5h0C2,113.25723,113.25723,2,250.5,2Z"/>
        <g>
          <path class="cls-4" d="M21.5,250.5h0C21.5,124.02679,124.02679,21.5,250.5,21.5h0c126.47321,0,229,102.52679,229,229h0c0,126.47321-102.52679,229-229,229h0c-126.47321,0-229-102.52679-229-229Z"/>
          <path class="cls-1" d="M23.5,250.5h0C23.5,125.13135,125.13135,23.5,250.5,23.5h0c125.36865,0,227,101.63135,227,227h0c0,125.36865-101.63135,227-227,227h0c-125.36865,0-227-101.63135-227-227Z"/>
        </g>
        <path class="cls-3" d="M122.5,250.5h0c0-70.69244,57.30756-128,128-128h0c70.69244,0,128,57.30756,128,128h0c0,70.69244-57.30756,128-128,128h0c-70.69244,0-128-57.30756-128-128Z"/>
      </svg>
    );
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
        newUI={newUI}
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
        newUI={newUI}
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
        style={{ transform: `translateX(calc(${size / 2}px - 50%)) translateY(calc(-${size / 8}px - 830%))` }}
        viewBox="0 0 32 33"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M22.2539 16.9656C22.2043 16.9656 22.1448 16.9062 22.1448 16.9062H22.1548L20.014 13.5266C19.9843 13.4672 20.0438 13.3581 20.0438 13.3581L29.0229 6.03413C29.0724 5.99448 29.1319 5.99448 29.1815 6.03413C29.2211 6.07377 29.231 6.14314 29.2013 6.1927L22.3629 16.9062C22.3332 16.9458 22.2539 16.9656 22.2539 16.9656ZM16.1688 16.8071L20.3015 20.1768V20.1668C20.3511 20.2065 20.361 20.2858 20.3313 20.3353L16.1291 26.926C16.0994 26.9656 16.0201 26.9854 16.0201 26.9854C15.9705 26.9854 15.9111 26.926 15.9111 26.926L2.84876 6.25221C2.80911 6.20265 2.82894 6.13328 2.86858 6.09363C2.90822 6.05399 3.02715 6.09363 3.02715 6.09363L16.03 16.6981L16.1688 16.8071Z" fill="#282828"/>
      </svg>
    );
  }

  function getFontSize() {
    return size * 0.064;
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
