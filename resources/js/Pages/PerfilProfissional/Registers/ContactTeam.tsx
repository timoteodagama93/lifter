import ButtonWraper from '@/Components/Button';
import FormSection from '@/Components/FormSection';
import TextInput from '@/Components/TextInput';
import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { MdCall, MdEmail, MdPlace } from 'react-icons/md';
import Welcome from './Welcome';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { BiArrowBack } from 'react-icons/bi';

const ContactTeam = () => {
  const { setCurrentPage } = useStateContext();

  return (
    <>
      <p className="w-full text-xl flex justify-between uppercase gap-5 pt-2">
        <button
          onClick={() => setCurrentPage(<Welcome />)}
          className="transform-effect px-5 "
        >
          <BiArrowBack className="text-xl" />
        </button>
        Entrar em contacto com a equipa
      </p>
      <div className="w-full flex flex-col mt-5 pl-5 border-t-4 pt-5 justify-center items-center">
        <div className="flex flex-row w-full gap-2 justify-start items-center">
          <BsWhatsapp />
          +244 927 678 173
        </div>
        <div className="flex flex-row w-full gap-2 justify-start items-center">
          <MdCall />
          +244 927 678 173
        </div>
        <div className="flex flex-row w-full gap-2 justify-start items-center">
          <MdEmail />
          contact@lifter.ao
        </div>
        <div className="flex flex-row w-full gap-2 justify-start items-center">
          <MdPlace />
          São Paulo, Luanda, Angola
        </div>
        <div className="w-full  pt-5">
          <p>
            Envie uma mensagem à equipa Lifter, teremos muito gosto em
            retornar-lhe.
          </p>
          <form title="Deixar uma mensagem" onSubmit={() => {}} className="p-5">
            <div className="w-full flex flex-col">
              <label htmlFor="name">Nome de contacto</label>
              <input type="text" name="name" id="name" />
            </div>
            <label htmlFor="message">Mensagem ou descrição da situação.</label>
            <textarea name="message" className="w-full " />
            <div className="w-full flex flex-row justify-end">
              <ButtonWraper>
                <button className='text-xl'>Enviar a mensagem</button>
              </ButtonWraper>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactTeam;
