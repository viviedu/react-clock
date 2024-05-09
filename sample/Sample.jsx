import React, { useState } from 'react';
import { useSetInterval } from '@wojtekmaj/react-hooks';
import Clock from '../src/Clock';

import '../src/Clock.less';
import './Sample.less';

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
            secondHandLength={87}
            secondHandWidth={4}
            size={500}
            value={value}
          />
        </main>
      </div>
    </div>
  );
}
