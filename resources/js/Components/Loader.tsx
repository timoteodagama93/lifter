import React from 'react';
import loader from '../assets/loader.svg';
function Loader({ title }) {
  return (
    <div className="w-full flex flex-com justify-center items-center">
      <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
      <h1 className="font-bold text-2xl texx-white">
        {' '}
        {title || 'Loading...'}{' '}
      </h1>
    </div>
  );
}

export default Loader;
