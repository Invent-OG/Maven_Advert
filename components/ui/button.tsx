'use client';

import React from 'react';

// ✅ Move helper functions ABOVE usage
const getStarPosition = (i: number) => {
  const angle = (i / 10) * 2 * Math.PI;
  const radius = 100;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return `top: ${50 + y}%; left: ${50 + x}%; transform: translate(-50%, -50%);`;
};

const getDuration = (i: number) => {
  return `${1 + i * 0.1}s`;
};

// ✅ Dynamically generated styles (you could also use Tailwind or CSS modules)
const styles = Array.from({ length: 10 }).map(
  (_, i) => `
  .star-${i} {
    position: absolute;
    ${getStarPosition(i)}
    filter: drop-shadow(0 0 0 #fffdef);
    z-index: -5;
    transition: all ${getDuration(i)} cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }
`
).join('\n');

export default function MagicButton() {
  return (
    <div className="relative inline-block p-4">
      <style>{styles}</style>

      <button className="relative z-10 px-6 py-3 bg-black text-white rounded-md">
        Hover Me
      </button>

      {/* Render stars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`star-${i}`}
          style={{
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
}
