import React from 'react';
import Interagir from './Interagir';

function CardObra({
  obra,
  w = 'w-full md:w-1/2',
  h = 'h-1/4 md:h-1/2 lg:h-1/3',
}) {
  return (
    <>
      <div className={` ${w} ${h} p-2 `}>
        <div className="w-full h-full  flex flex-col relative justify-center item-center   shadow-black shadow-inner p-5">
          <div className="w-full h-full  flex flex-col relative justify-center item-center p-1 border  hover:cursor-pointer ">
            <div className="w-full h-full flex justify-center items-center rigth-0">
              <img
                className="w-full h-full relative right-0"
                src={`/arts/${obra.exposition_id}/${obra.item_url}`}
              />
            </div>



            <div className="w-full flex flex-col gap-0">
              <Interagir collectionType='arte_visual' song={obra} />
              <span className="border-t-2 relative text-2xl text-yellow-400 font-bold">
                {obra?.title}
              </span>
              <span className=" relative text-xl  font-bold">
                Categoria da obra: {obra?.category}
              </span>
              <p className=" relative text-base">{obra?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardObra;
