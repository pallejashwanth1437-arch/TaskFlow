import React from 'react';

const ProgressCircle = ({ percentage }) => {
  const size = 108;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;

  const renderTicks = () => {
    let ticks = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * 360;
      const major = i % 3 === 0;
      const r1 = r + stroke / 2 + 2;
      const r2 = r1 + (major ? 5 : 2.5);
      const rad = (angle * Math.PI) / 180;
      const cx = size / 2;
      const cy = size / 2;
      ticks.push(
        <line
          key={i}
          x1={cx + r1 * Math.cos(rad)}
          y1={cy + r1 * Math.sin(rad)}
          x2={cx + r2 * Math.cos(rad)}
          y2={cy + r2 * Math.sin(rad)}
          stroke="#232733"
          strokeWidth="1"
        />
      );
    }
    return ticks;
  };

  return (
    <svg width={size} height={size} className="-rotate-90">
      {renderTicks()}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1D212C" strokeWidth={stroke} />
      <defs>
        <linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B8EF5" />
          <stop offset="100%" stopColor="#F0A93A" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#gg)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
};

export default ProgressCircle;
