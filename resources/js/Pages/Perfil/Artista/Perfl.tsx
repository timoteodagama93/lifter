import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import AddArtist from '@/Components/AddArtist';
import {
  BiInfoCircle,
  BiMessage,
  BiNote,
  BiPhone,
  BiStar,
} from 'react-icons/bi';
import { GiSpearFeather } from 'react-icons/gi';
import { GrAnnounce } from 'react-icons/gr';
import { MdCall, MdEmail, MdMusicNote, MdPhoto, MdPlace } from 'react-icons/md';
import { DetailsArtist } from './Info';
import Marketing from './Marketing';
import { ShowMusics } from './Song';
import { BsWhatsapp } from 'react-icons/bs';
import FormSection from '@/Components/FormSection';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import ButtonWraper from '@/Components/Button';

function Perfl() {
  const page = useTypedPage();
  const { currentPage, setCurrentPage } = useStateContext();

  const [artist, setArtist] = useState(page.props.artist_account);
  const initialPage =
    page.props.auth.user.is_artist === 0 ? (
      <>
        <div className="w-full flex flex-col  rounded-lg shadow-lg">
          <div className="w-full">
            <p className="w-full mt-2 p-5 ">
              Seja bem-vindo, gerencie aqui o perfil artístico. Podes adicionar
              outros músicos se você é um agente, produtor ou empresário.
            </p>
          </div>
        </div>
      </>
    ) : (
      <DetailsArtist artist={artist} />
    );
  const [pagina, setPagina] = useState(initialPage);

  return (
    <AppLayout title="Perfil">
      <div className="w-full h-full">
        <div className="relattive w-full h-full flex flex-col">
          {page.props.auth.user.is_artist === 0 ? (
            <div className="flex flex-col justify-center ">
              <h1 className="px-5 text-xl">
                Você não tem um perfil artístico activo.
              </h1>
              <p className="text-base">
                Se você for um produtor, empresário, agencia, etc e gostaria de
                gerenciar múltiplos artistas, por favor entre em contacto com a
                nossa equipa.
              </p>
              <div className="flex gap-2 m-1">
                <ButtonWraper>
                  <button
                    onClick={() =>
                      setPagina(<AddArtist setPagina={setPagina} />)
                    }
                  >
                    <GiSpearFeather className="text-4xl mr-1" />
                    Criar perfil artístico
                  </button>
                </ButtonWraper>
                <ButtonWraper>
                  <button onClick={() => setPagina(<ContactTeam />)}>
                    <BiPhone className="text-4xl mr-1" />
                    Contactar equipa
                  </button>
                </ButtonWraper>
              </div>
            </div>
          ) : (
            <HeaderArtist artist={artist} setPagina={setPagina} />
          )}
          {pagina}
        </div>
      </div>
    </AppLayout>
  );
}

export default Perfl;

function HeaderArtist({ artist, setPagina }) {
  return (
    <>
      <div
        className="relative w-full flex flex-col rounded-lg shadow-lg shadow-black p-5 justify-center items-center mb-5"
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(${artist?.url_cover})`,
        }}
      >
        <div className="w-20 h-20 m-2 flex relative">
          <img
            src={artist?.url_cover}
            className=" rounded-full w-full h-full border border-black transform-effect "
          />
          <ButtonWraper className="absolute bottom-1 right-1  ">
            <button className="">
              <MdPhoto className='w-2 h-2' />
            </button>
          </ButtonWraper>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-xl md:text-2xl text-bold">{artist?.name}</h2>
          <div className="w-full flex flex-row justify-center items-center">
            <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex">
              {' '}
              <BiNote /> 0{' '}
            </span>
            <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex">
              {' '}
              <BiMessage /> 0{' '}
            </span>
            <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center flex">
              {' '}
              <BiStar /> 0{' '}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center gap-2">
          <ButtonWraper>
            <button
              onClick={() => setPagina(<DetailsArtist artist={artist} />)}
              className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
            >
              <BiInfoCircle className="text-xl mr-1" />
              Informações
            </button>
          </ButtonWraper>
          <ButtonWraper>
            <button
              onClick={() => setPagina(<Marketing artist={artist} />)}
              className="border border-b-4 hover:bg-[#2e2c2e]   border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
            >
              <GrAnnounce className="text-xl mr-1" />
              Marketing
            </button>
          </ButtonWraper>
          <ButtonWraper>
            <button
              onClick={() => setPagina(<ShowMusics artist={artist} />)}
              className="border border-b-4 hover:bg-[#2e2c2e]  border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
            >
              <MdMusicNote className="text-xl mr-1" />
              Músicas
            </button>
          </ButtonWraper>
        </div>
      </div>
    </>
  );
}

const ContactTeam = () => {
  return (
    <div className="w-full flex flex-col text-xl mt-5 pl-5 border-t-4 pt-5 justify-center items-center">
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
        timoteodagama93@gmail.com
      </div>
      <div className="flex flex-row w-full gap-2 justify-start items-center">
        <MdPlace />
        São Paulo, Luanda, Angola
      </div>
      <div className="p-2">
        <FormSection
          title="Deixar uma mensagem"
          description="Envie uma mensagem à equipa Lifter, teremos muito gosto em retornar-lhe."
          onSubmit={() => {}}
        >
          <div className="text-black w-full flex flex-col">
            <div className="w-full flex flex-row">
              <InputLabel htmlFor="name" value="Nome completo" />
              <TextInput name="name" className="w-full bg-black " />
            </div>
            <div className="w-full flex flex-row">
              <ButtonWraper>
                <button>Enviar</button>
              </ButtonWraper>
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
};
