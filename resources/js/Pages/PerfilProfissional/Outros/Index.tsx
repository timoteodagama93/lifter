import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import AddArtist from '@/Pages/PerfilProfissional/Registers/AddArtist';
import {
  BiInfoCircle,
  BiLibrary,
  BiMusic,
  BiPhone,
  BiStar,
  BiStats,
  BiVideo,
} from 'react-icons/bi';
import { GiSpearFeather } from 'react-icons/gi';
import { GrAnnounce } from 'react-icons/gr';
import {
  MdCall,
  MdEmail,
  MdOutlineMessage,
  MdPlace,
  MdWork,
} from 'react-icons/md';
import { DetailsArtist } from './Info';
import Marketing from './Marketing';
import { BsShare, BsWhatsapp } from 'react-icons/bs';
import FormSection from '@/Components/FormSection';
import TextInput from '@/Components/TextInput';
import ButtonWraper from '@/Components/Button';
import ArtistSongsFeedbacks from './ArtistSongsFeedbacks/ArtistSongsFeedbacks';
import { smalLogo } from '../../../../img';
import { HiHeart, HiMusicNote } from 'react-icons/hi';
import { TiMessages } from 'react-icons/ti';
import { useGetArtistStatsQuery } from '@/redux/services/coreApi';
import { Error, Loader } from '@/Components';
import AddProfissional from '@/Pages/PerfilProfissional/Registers/AddProfissional';

function Profissional() {
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
    <div className="w-full h-full">
      <div className="relattive w-full h-full flex flex-col">
        {page.props.auth.user.is_artist === 0 ? (
          <div className="flex flex-col justify-center ">
            <h1 className="px-5 text-xl">
              Você não tem um perfil profissional activo.
            </h1>
            <p className="text-base">
              Se você for um produtor, empresário, agencia, etc e gostaria de
              gerenciar múltiplos artistas, por favor entre em contacto com a
              nossa equipa.
            </p>
            <div className="flex gap-2 m-1">
              <ButtonWraper>
                <button
                  onClick={() => setPagina(<AddArtist setPagina={setPagina} />)}
                >
                  <GiSpearFeather className="text-4xl mr-1" />
                  Criar perfil artístico
                </button>
              </ButtonWraper>
              <ButtonWraper>
                <button
                  onClick={() =>
                    setPagina(<AddProfissional setPagina={setPagina} />)
                  }
                >
                  <MdWork className="text-4xl mr-1" />
                  Criar perfil profissional
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
          <div
            className={` ${
              pagina.type.name === 'ArtistSongsFeedbacks' ? 'hidden' : 'flex'
            }  `}
            style={{ transition: '1s' }}
          >
            <HeaderArtist artist={artist} setPagina={setPagina} />
          </div>
        )}
        {pagina}
      </div>
    </div>
  );
}

export default Profissional;

function HeaderArtist({ artist, setPagina }) {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className=" flex flex-row justify-between items-center w-full  gap-1 border-b-2">
          <div className="flex flex-row gap-2 lg:gap-5 p-1 ">
            <button
              onClick={() => setPagina(<DetailsArtist artist={artist} />)}
              className="text-sm md:text-3xl transform-effect p-1 flex flex-col lg:flex-row justify-center items-center"
            >
              {' '}
              <BiInfoCircle className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Info</span>
            </button>
            <button
              onClick={() => {
                setPagina(
                  <ArtistSongsFeedbacks
                    setPagina={setPagina}
                    artist={artist}
                  />,
                );
              }}
              className="text-sm md:text-3xl transform-effect p-1 flex flex-col lg:flex-row justify-center items-center"
            >
              <HiMusicNote className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Gerir Músicas</span>
            </button>

            <button
              onClick={() =>
                setPagina(
                  <ArtistSongsFeedbacks
                    setPagina={setPagina}
                    artist={artist}
                  />,
                )
              }
              className="hidden text-sm md:text-3xl transform-effect p-1 flex flex-col lg:flex-row justify-center items-center"
            >
              <BiVideo className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Vídeos</span>
            </button>

            <button
              onClick={() => setPagina(<Marketing artist={artist} />)}
              className="text-sm md:text-3xl transform-effect p-1 flex flex-col lg:flex-row justify-center items-center gap-1 "
            >
              <GrAnnounce className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Marketing</span>
            </button>
            <button
              onClick={() => setPagina(<Stats artist={artist} />)}
              className="text-sm md:text-3xl transform-effect p-1 flex flex-col lg:flex-row justify-center items-center gap-1"
            >
              <BiStats className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Estatísticas</span>
            </button>
            <button
              onClick={() => setPagina(<Stats artist={artist} />)}
              className="text-sm md:text-3xl transform-effect p-1 flex flex-col lg:flex-row justify-center items-center gap-1"
            >
              <BiStats className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Avaliações</span>
            </button>
          </div>

          <div className="flex flex-row justify-center items-center gap-1">
            <span className="hidden md:flex"> {artist?.name} </span>
            {artist?.url_cover ? (
              <img
                src={artist?.url_cover}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img src={smalLogo} alt="" className="w-10 h-10 rounded-full" />
            )}
          </div>
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
        contact@lifter.ao
      </div>
      <div className="flex flex-row w-full gap-2 justify-start items-center">
        <MdPlace />
        São Paulo, Luanda, Angola
      </div>
      <div className="w-full ">
        <FormSection
          title="Deixar uma mensagem"
          description="Envie uma mensagem à equipa Lifter, teremos muito gosto em retornar-lhe."
          onSubmit={() => {}}
        >
          <div className="text-black w-full ">
            <div className="w-full flex flex-row">
              <label htmlFor="name">Nome de contacto</label>
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

function Stats({ artist }) {
  const { data: stats, isFetching, error } = useGetArtistStatsQuery(artist?.id);
  useEffect(() => {
    console.log(stats?.quantidade_musicas?.length);
  }, [stats]);
  return (
    <div className="relative w-full flex flex-col rounded-lg shadow-lg shadow-black p-5 justify-between items-center mb-5">
      <div className="w-full flex flex-col items-center">
        <div className="w-20 h-20 m-2 flex relative">
          <img
            src={artist?.url_cover}
            className=" rounded-full w-full h-full border border-black transform-effect "
          />
        </div>
        <h2 className="text-xl md:text-2xl text-bold">{artist?.name}</h2>
      </div>
      {isFetching ? (
        <Loader title="Carregando estatísticas" />
      ) : (
        <>
          {!error && (
            <div className="w-full flex flex-col justify-end">
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Melhor posição alcançada no ranking 1ª lugar
                <BiMusic /> 0{' '}
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Posição actual no ranking 11ª posicão
                <BiMusic /> 0{' '}
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Músicas
                <BiMusic />{' '}
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] text-white ">
                  {stats?.quantidade_musicas?.length}
                </span>
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Vídeos
                <BiVideo />
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] ">
                  {stats?.quantidade_videos?.length}
                </span>
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Comentários <TiMessages />
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] ">
                  {stats?.quantidade_comentarios}
                </span>
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Partilhado <BsShare /> 0 vezes
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Avaliado <BiStar />
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] ">
                  {stats?.quantidade_avaliacoes}
                </span>
                vezes
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Recebidos <MdOutlineMessage />
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] ">
                  {stats?.quantidade_feedbacks}
                </span>
                feedbacks
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Em <BiLibrary />{' '}
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] ">
                  {stats?.quantidade_colecoes}
                </span>
                playlists
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2  flex justify-start items-center">
                {' '}
                Favoritado <HiHeart />
                <span className="flex text-bold text-xl justify-center items-center w-10 h-10 rounded-full bg-[#543889] ">
                  {stats?.quantidade_gostos}
                </span>
                vezes
              </span>
            </div>
          )}
        </>
      )}
      {error && !isFetching && <Error />}
    </div>
  );
}
