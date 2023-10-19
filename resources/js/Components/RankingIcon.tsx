import React from 'react';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi';

export default function RankingIcon({ className = '' }) {
  return (
    <>
      <div className="flex flex-row italic mr-2">
        <HiArrowUp
          className={`   -m-1 text-xl italic text-[#4c88c4] ${className}  `}
        />
        <HiArrowDown
          className={` -m-1 text-xl italic text-red-600  ${className}   `}
        />
      </div>
    </>
  );
}
