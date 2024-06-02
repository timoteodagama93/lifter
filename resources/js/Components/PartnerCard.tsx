import React from 'react';

function PartnerCard({ src, nome, descricao = '' }) {
  return (
    <div className="w-56 h-40 flex flex-col p-5 justify-center items-center gap-y-2 ">
      <div className="w-full h-36 shadow-black shadow-xl p-5 rounded-md flex justify-center items-center object-cover ">
        {' '}
        <img className="w-full h-auto" src={src} alt={nome} />{' '}
      </div>
      <p className="text-bold text-base md:text-xl text-gray-500 ">{nome}</p>
    </div>
  );
}

export default PartnerCard;
