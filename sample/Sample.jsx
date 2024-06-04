import React, { useState } from 'react';
import { useSetInterval } from '@wojtekmaj/react-hooks';
import Clock from '../src/Clock';

import '../src/Clock.less';
import './Sample.less';

function OldClock(props) {
  return (
    <Clock
      hourHandWidth={5}
      minuteHandWidth={3}
      renderNumbers={true}
      secondHandLength={70}
      secondHandWidth={2}
      size={500}
      {...props}
    />
  );
}

function NewClock(props) {
  return (
    <Clock
      hourHandLength={30}
      hourHandWidth={8}
      hourMarksLength={30}
      hourMarksWidth={4}
      hourHandOppositeLength={0}
      minuteHandLength={50}
      minuteHandWidth={7}
      minuteHandOppositeLength={0}
      newUI={true}
      renderMinuteMarks={false}
      renderNumbers={true}
      secondHandLength={88}
      secondHandWidth={7}
      size={500}
      {...props}
    />
  );
}

function ClockWrapper({ newUI, ...props }) {
  return newUI ? <NewClock {...props} /> : <OldClock {...props} />;
  
}

export default function Sample() {
  const [value, onChange] = useState(new Date());

  useSetInterval(() => {
    const now = new Date();
    onChange(now);
  }, 1000);

  return (
    <div className="Sample">
      <header>
        <h1>react-clock sample page</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <ClockWrapper newUI={true} value={value} />
        </main>
      </div>
    </div>
  );
}
