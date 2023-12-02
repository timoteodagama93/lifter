import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { smalLogo } from '../../../../../img';

function ValuationsRequestsList({
  valuatedSongs,
  songs = [],
  setSelectedValuation,
  selectedValuation,
}) {

  const { isPlaying, activeSong } = useSelector(state => state.player);
  if (isPlaying) {
    setSelectedValuation(activeSong);
  }

  return (
    <>
      <div className="w-4/12 h-full overflow-hidden border-r ">
        {/**Área de previsualização de conversas e notificações */}
        <div className="w-full h-full overflow-y-auto flex flex-col md:px-5">
          {true ? (
            <>
              {valuatedSongs?.map(valuatedItem => (
                <div
                  key={valuatedItem?.id}
                  onClick={() => setSelectedValuation(valuatedItem)}
                  className={`flex transform-effect flex-row items-center hover:rounded-md ${
                    selectedValuation?.id === valuatedItem?.id
                      ? 'bg-[#2e2c2e] text-white'
                      : 'hover:bg-[#2e2c2e] hover:text-white'
                  }  p-0 md:p-1 cursor-pointer mb-2`}
                >
                  <div className="flex-1 flex flex-row justify-start space-x-2 items-center">
                    {valuatedItem.cover ? (
                      <img
                        src={valuatedItem?.cover}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    ) : (
                      <img
                        src={smalLogo}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    )}
                    <div className="w-full md:flex flex-col justify-start items-center">
                      <div className="w-full flex flex-col justify-between">
                        <p className="text-xs md:text-base lg:text-xl font-bold ">
                          {' '}
                          {valuatedItem.title}{' '}
                        </p>
                        <span className="text-xs">
                          {' '}
                          {valuatedItem?.messages?.time}{' '}
                        </span>
                      </div>
                      <span className="w-full flex justify-start text-xs md:text-base">
                        {' '}
                        {valuatedItem?.artist}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {songs?.map((song, i) => (
                <div
                  key={song?.id}
                  className={`flex transform-effect flex-row items-center hover:rounded-md ${
                    activeSong?.id === song?.id
                      ? 'bg-[#2e2c2e] text-white'
                      : 'hover:bg-[#2e2c2e] hover:text-white'
                  }  p-0 md:p-1 cursor-pointer mb-2`}
                >
                  <div className="flex-1 flex flex-row justify-start space-x-2 items-center">
                    {song.cover ? (
                      <img
                        src={song?.cover}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    ) : (
                      <img
                        src={smalLogo}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    )}
                    <div className="w-full md:flex flex-col justify-start items-center ">
                      <div className="w-full flex flex-col justify-between">
                        <p className="text-xs md:text-base lg:text-xl font-bold ">
                          {' '}
                          {song.title}{' '}
                        </p>
                        <span className="text-xs">
                          {' '}
                          {song?.messages?.time}{' '}
                        </span>
                      </div>
                      <span className="w-full flex justify-start text-xs md:text-base">
                        {' '}
                        {song?.artist}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ValuationsRequestsList;
