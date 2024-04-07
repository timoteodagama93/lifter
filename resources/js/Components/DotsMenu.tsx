import React, { useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import DialogModal from './DialogModal';
import ConfirmationModal from './ConfirmationModal';

function DotsMenu({}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div 
    onClick={ () => setIsOpen(true) }
    className="rounded-full p-1 border border-orange-700 bg-gray-500 text-black">
      <BiDotsHorizontal size={30} className="" onClick={() => {}} />
    </div>
    
    <ConfirmationModal isOpen={isOpen} onClose={ ()=> setIsOpen(false) }>
      <div className="w-full h-full flex">
        <h1 className='text-xl'>Ola</h1>
      </div>
    </ConfirmationModal>
      </>
  );
}

export default DotsMenu;
