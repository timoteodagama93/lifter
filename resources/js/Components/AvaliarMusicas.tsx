import React from 'react';
import { songs } from '../../data/dummy';
import { BiStar } from 'react-icons/bi';

import { BsStar } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';

function AvaliarMusicas({song, index}) {
  const valuationStars = [1, 2, 3, 4, 5];
  return (
    <div className="pt-0 py-12 w-full p-5 h-[80vh] border border-red-500">
      <div className="flex-col h-full">
        <div className="w-full h-full flex flex-col">
          <span className="absolute top-3 bg-black text-white p-1 text-xs rounded animate-pulse right-10"><span>2</span> / <span>5</span> </span>
          <img className="h-full" src={songs[index]?.images.coverart} />
          <div className="bg-[#2e2c2e30] text-white w-full justify-center items-center flex flex-col relative bottom-20">
            <span className="text-xs animate-bounce">Avalie este conteúdo</span>
            <div className="w-full justify-center items-center flex flex-row">
              {valuationStars.map(start => (
                <span className="text-4xl">
                  <BsStar />{' '}
                </span>
              ))}
            </div>
            <button className="flex gap-2 justify-center items-center border px-1 my-1 rounded">
              <FaRandom />
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvaliarMusicas;
