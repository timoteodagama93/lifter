import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { generos, songs } from '../../data/dummy';
import SelectGenre from '@/Components/SelectGenre';
import AscensaoListItem from '@/Components/AscensaoListItem';

function Estrelas() {
  const [activar, setActivar] = useState('em_palco');
  const competidor1 = 'Mobbers';
  const competidor2 = 'TRX';
  return (
    <AppLayout title="Estrelas">
      <div className="pb-12">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-1 mb-10">
            <h2 className="font-bold text-3xl text-left">Palco das Estrelas</h2>

            <div className="flex flex-row justify-center items-center mx-5">
              <button
                className="w-auto justify-center items-center text-xl text-bold p-3"
                onClick={() => setActivar('em_palco')}
              >
                Em Palco
                {activar === 'em_palco' ? (
                  <div className="justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="w-auto flex  justify-center items-center text-xl text-bold p-3"
                onClick={() => setActivar('batalhas')}
              >
                {competidor1}
                <span className='mx-2'>
                  {' '}
                  VS{' '}
                  {activar === 'batalhas' ? (
                    <div className="justify-center mx-auto w-12 rounded-lg border-b-4 border-[#d17734]" />
                  ) : ''}
                </span>
                {competidor2}
              </button>
            </div>

            <div className="w-auto">
              <SelectGenre className="" />
            </div>
          </div>

          <div className="w-full">
            {activar == 'em_palco' ? (
              songs?.map((song, id) => (
                <AscensaoListItem song={song} i={id} key={song.id} />
              ))
            ) : (
              <div className="w-full flex  justify-center items-center">
                <div className='w-1/2'> {competidor1} </div>
                <div className='w-1/2'> {competidor2} </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Estrelas;
