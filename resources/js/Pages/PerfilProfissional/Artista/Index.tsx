import React, { useEffect, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import {
  BiInfoCircle,
  BiLibrary,
  BiMusic,
  BiStar,
  BiStats,
  BiVideo,
} from 'react-icons/bi';
import { GrAnnounce } from 'react-icons/gr';
import {
  MdOutlineMessage,
  MdStars,
} from 'react-icons/md';
import Marketing from './Marketing';
import { BsShare } from 'react-icons/bs';
import ArtistSongsManager from './ArtistSongsManager/ArtistSongsManager';
import { smalLogo } from '../../../../img';
import { HiHeart, HiMusicNote } from 'react-icons/hi';
import { TiMessages } from 'react-icons/ti';
import { useGetArtistStatsQuery } from '@/redux/services/coreApi';
import { Error, Loader } from '@/Components';
import { DetailsArtist } from './Info';

function Artist() {
  const page = useTypedPage();

  const [artist, setArtist] = useState(page.props.artist_account);
  const [pagina, setPagina] = useState(<DetailsArtist artist={artist} />);

  return (
    <div className="w-full h-full">
      <div className="relattive w-full h-full flex flex-col">
        <HeaderArtist artist={artist} setPagina={setPagina} />
        {pagina}
      </div>
    </div>
  );
}

export default Artist;

function HeaderArtist({ artist, setPagina }) {
  const { currentPage, setCurrentPage } = useStateContext();

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
                setCurrentPage(
                  <ArtistSongsManager
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
                  <ArtistSongsManager
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
              <MdStars className="w-7 h-auto font-bold" />
              <span style={{ fontSize: '1rem' }}>Avaliar</span>
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
