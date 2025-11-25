import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizes[size]} border-t-2 border-b-2 border-pink-500 rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;
