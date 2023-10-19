import React from 'react';
import './style_gallery.css';
import { artists } from '../../data/dummy';
import PlayPause from '@/Components/PlayPause';
import { HiEye } from 'react-icons/hi';
import SectionBorder from '@/Components/SectionBorder';
function ArtistsGalery({ nome_colecao }) {
  const a = [1, 2, 3, 2, 3, 1, 2, 3, 1, 3];
  return (
    <div>
      <div className="container w-full h-full ">
        <h2 className="hidden md:flex heading-text text-center space-x-2 text-white">
          <span> </span> <span> {nome_colecao} </span>
        </h2>
        <div className="image-gallery">
          <div className="column">
            {a.map(i => (
              <>
                <div className="image-item ">
                  <img src={artists[i].images.artistImage} alt="" />
                  <div className="overlay " onClick={() => {}}>
                    <span className=" p-2 shadow shadow-black justify-center items-center flex flex-col text-xs">
                      <HiEye className="w-10 h-10 hover:text-[#62c]" /> Detalhes
                    </span>
                    <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                      <span className="text-xl">Timóteo da gama</span>
                      <div className="flex flex-row space-x-2 text-xs">
                        <span className="text-base">Angola</span>
                        <span className="text-base">|</span>
                        <span className="text-base">RnB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
           
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default ArtistsGalery;
