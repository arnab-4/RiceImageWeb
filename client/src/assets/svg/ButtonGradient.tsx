import React from 'react';

const ButtonGradient: React.FC = () => {
  return (
    <svg
      className="absolute w-0 h-0 overflow-hidden"
      aria-hidden="true"
      focusable="false"
    >
      <linearGradient id="button-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </svg>
  );
};

export default ButtonGradient;