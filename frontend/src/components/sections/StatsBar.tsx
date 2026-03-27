'use client';
import { useState, useEffect } from 'react';

const stats = [
  { endValue: 25, suffix: '+', label: 'Years in Service' },
  { endValue: 200, suffix: '+', label: 'Projects Delivered' },
  { endValue: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 'ZERO', label: 'Safety Incidents' },
];

interface CountingNumberProps {
  endValue: number;
  suffix: string;
  duration?: number;
}

function CountingNumber({ endValue, suffix, duration = 2000 }: CountingNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [endValue, duration]);

  return `${count}${suffix}`;
}

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-bar__grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-item__value">
              {s.endValue ? (
                <CountingNumber endValue={s.endValue} suffix={s.suffix} />
              ) : (
                s.value
              )}
            </span>
            <span className="stat-item__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
