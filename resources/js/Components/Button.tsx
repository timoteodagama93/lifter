import React from 'react';

const ButtonWraper = ({ children, className = '' }) => {
  return (
    <div
      className={`w-fit border border-b-4 bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg border-[#4c88c4] rounded text-xs items-center justify-center flex flex-row md:p-2 transform-effect ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonWraper;
