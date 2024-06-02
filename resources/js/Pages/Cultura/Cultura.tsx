import { useStateContext } from '@/contexts/PaginaActualContext';
import React from 'react';
import { BiBookOpen, BiBrush } from 'react-icons/bi';
import { BsCameraVideo } from 'react-icons/bs';
import { GiCrimeSceneTape } from 'react-icons/gi';
import { MdOutlineMotionPhotosOn } from 'react-icons/md';
import Dance from './Dance';
import ArtesMistas from './ArtesMistas';
import Exposicoes from './Exposicoes';
import BibliotecaLiteraria from './BibliotecaLiteraria';

export default function Coltura({}) {
  const { setCurrentPage } = useStateContext();
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col gap-5 mb-20 ">
          <p className="text-xl md:text-2xl text-center fader-in pt-5 ">
            Um povo sem cultura é um povo sem identidade, redescubra os
            principais hábitos e costumes que conformavam a cultura ancestral
            dos países lusofonos da qual a cultura contemporânea originou-se.
          </p>
          <h1 className="text-2xl md:text-4xl text-bold text-gradient_ flex justify-center fader-in items-center gap-5">
            Selecione o país e veja sua cultura!
          </h1>
          <select defaultValue="Angola">
            <option>Angola</option>
            <option>Brasil</option>
            <option>Cabo-Verde</option>
            <option>Guine Bissau</option>
            <option>Guine Equatorial</option>
            <option>Moçambique</option>
            <option>Portugal</option>
          </select>
        </div>
        <div className="w-full flex flex-wrap relative h-full p-5 md:p-24 justifiy-center items-center ">
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<BibliotecaLiteraria />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBookOpen className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Línguas
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Dance />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <MdOutlineMotionPhotosOn className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Tradições, Hábitos e Costumes
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<ArtesMistas />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <GiCrimeSceneTape className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Jogos
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Religião e Espiritualidade
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Gastronomia
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Arte e Expressões Artísticas
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Vestimenta e Moda
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                História e Herança
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Valores e Normas Sociais
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Geografia e Território
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Mitos e Lendas
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Organização Social
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
            <div
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
            >
              <div className="flex justify-center items-center w-full rigth-0">
                <BiBrush className="w-1/2 h-full relative right-0" />
              </div>
              <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
                Tecnologia, Invenções e Ferramentas
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
