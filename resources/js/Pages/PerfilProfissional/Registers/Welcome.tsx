import ButtonWraper from '@/Components/Button';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import React, { useState } from 'react';
import { BiPhone, BiVoicemail } from 'react-icons/bi';
import { BsForward, BsSoundwave } from 'react-icons/bs';
import { GiSpearFeather } from 'react-icons/gi';
import { MdWork } from 'react-icons/md';
import AddArtist from './AddArtist';
import AddProfissional from './AddProfissional';
import ContactTeam from './ContactTeam';
import Artist from '../Artista/Index';
import Profissional from '../Outros/Index';

const Welcome = ({}) => {
  const page = useTypedPage();
  const { currentPage, setCurrentPage } = useStateContext();
  const [artista, setArtist] = useState(page.props.artist_account);

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="p-5 text-2xl text-center">
        Seja bem vindo ao seu gestor profissional.
      </h1>

      <>
        <p className="text-base p-2">
          Parece que ainda não possui nenhum perfil. Escolha uma das opções e
          crie-o agora e aproveite os benefícios especialmente pensamos para
          facilitar seus processos.
        </p>

        <div className="flex gap-2 m-1">
          <ButtonWraper>
            <button onClick={() => setCurrentPage(<AddArtist />)}>
              <GiSpearFeather className="text-4xl mr-1" />
              Criar perfil artístico
            </button>
          </ButtonWraper>
          <ButtonWraper>
            <button onClick={() => setCurrentPage(<AddProfissional />)}>
              <MdWork className="text-4xl mr-1" />
              Juntar-se à rede Lifter
            </button>
          </ButtonWraper>
          <ButtonWraper>
            <button onClick={() => setCurrentPage(<ContactTeam />)}>
              <BiPhone className="text-4xl mr-1" />
              Contactar equipa
            </button>
          </ButtonWraper>
        </div>
      </>
    </div>
  );
};

export default Welcome;
