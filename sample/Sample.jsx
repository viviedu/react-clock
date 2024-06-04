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
            hourHandWidth={5}
            minuteHandWidth={3}
            newUI={true}
            renderNumbers={true}
            secondHandLength={70}
            secondHandWidth={2}
            size={500}
            value={value}
          />
        </main>
      </div>
    </div>
  );
}
