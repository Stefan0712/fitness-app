import React from 'react';
import './stylings/ProgressCircle.css';

const ProgressCircle = ({ currentAmount, targetAmount, size, strokeWidth, color, radiusSize, icon }) => {
  const radius = (size - strokeWidth) / radiusSize; 
  const circumference = 2 * Math.PI * radius; 
  const progress = (currentAmount / targetAmount) * 100; 
  const strokeDashoffset = circumference - (progress / 100) * circumference; 

  return (
    <div className="progress-circle">
      <svg width={size} height={size}>
        <circle
          className="progress-circle-bg"
          stroke="#e0e0e0" 
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-circle-bar"
          stroke={color} 
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {icon ? (
      <div className='progress-circle-icon'>
        <img src={icon} alt=''></img>
      </div>)
      : ''}
    </div>
  );
};

export default ProgressCircle;
