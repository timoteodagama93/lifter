import React from 'react';

function Step({ index, active,  }) {
  return (
    <div
      //onClick={() => setActive(index)}
      className={`cursor-pointer text-xl p-1 md:py-3 border mb-1 md:px-5 rounded ${active == index ? 'bg-blue-400' : 'bg-white'} `}
    >
      <span>{index} </span>
    </div>
  );
}

export default Step;
