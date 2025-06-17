import React from 'react';

const SliderIndicator = ({ isActive = false }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${isActive 
          ? 'bg-indigo-900 text-white' 
          : 'bg-gray-200 text-gray-500'}
      `}>
        <svg 
          className={`w-6 h-6 ${isActive ? 'animate-spin-slow' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SliderIndicator; 