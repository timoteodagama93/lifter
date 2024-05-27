import React, { useRef, useState } from 'react';
import PlayPauseVideo from './PlayPauseVideo';
import { playPauseVideo, setActiveVideo } from '@/redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import route from 'ziggy-js';
import DropdownLink from './DropdownLink';
import OwnerCard from './OwnerCard';
import axios from 'axios';
import Swal from 'sweetalert2';
import CommentsSection from './CommentsSection';
import FeedbacksSection from './FeedbacksSection';

function CardVideo({
  type = 'normal',
  videos,
  video,
  isPlayingVideo,
  activeVideo,
  i,
}) {
  const ref = useRef(null);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPauseVideo(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveVideo({ video, videos, i }));
    dispatch(playPauseVideo(true));
  };

  const score =
    (video.stars +
      video.plays +
      video.likes +
      video.reprodution_time +
      video.downloads +
      video.shares) /
    5;

  const src =
    type == 'normal'
      ? `/videos/${video.user_id}/${video.saved_name}`
      : `/songs/${video.artist_id}/${video.saved_name}`;

  return (
    <>
      <div className="w-full h-full p-1 flex flex-col items-center justify-center  hover:bg-[#0094f8] opacity-90 rounded-lg ">
        <div className="relative w-full h-4/5  border rounded-lg group ">
          <div
            style={{ transition: '1s' }}
            className={`absolute z-10 inset-0 justify-center items-center  bg-opacity-50 flex ${
              activeVideo?.id === video.id ? 'flex' : ' flex  bg-opacity-70'
            } `}
          >
            <PlayPauseVideo
              isPlayingVideo={isPlayingVideo}
              activeVideo={activeVideo}
              video={video}
              handlePlay={handlePlayClick}
              handlePause={handlePauseClick}
            />
          </div>

          <video className="w-full h-full rounded-lg">
            <source src={src} type={activeVideo.mime_type} />
          </video>

          <div className="w-full flex flex-row absolute z-10 bottom-0 right-0 items-center justify-between">
            <button
              onClick={handlePauseClick}
              className=" transform-effect text-xl uppercase bg-blue-400 "
            >
              <MdOutlineCloseFullscreen className="w-7 h-7" />
            </button>
            <OptionsPopup collection={video} collectionType="video" />
          </div>
        </div>
        <div className="w-full h-1/5  mx-5 justify-start">
          <OwnerCard
            collectionId={video.id}
            ownerId={type == 'normal' ? video.user_id : video.artist_id}
            title={video.title}
            collectionType={type}
            category_or_style={video.category}
            collectionScore={score}
          />
        </div>
      </div>
    </>
  );
}

export default CardVideo;

function OptionsPopup({ collection, collectionType = 'song' }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function colecionar() {
    axios
      .post('collect-song', {
        song_id: collection.id,
        collection_type: collectionType,
      })
      .then(response => {
        Swal.fire({
          title: 'Música colecionada',
          text: 'A música foi adicionada à sua coleção, podes gerir sua playlist no seu perfil. ',
          icon: 'success',
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência.',
          icon: 'error',
        });
      });
  }

  const handleDownload = async () => {
    if (collectionType == 'song') {
      try {
        Swal.fire({
          title: 'Baixando música',
          text: 'A música está sendo baixada, mantenha a conexão a Internet, enquanto isso podes continuar a navegar, assim que o download for concluido você será notificado(a).',
          icon: 'info',
        });
        const response = await axios.get(`/download/song/${collection.id}`, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], {
          type: response.headers['Tontent-Type'],
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = collection.original_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire({
          title: 'Download concluido',
          text: 'A música foi salva no seu disopositivo.',
          icon: 'success',
        });
      } catch (error) {
        console.log('ERROR DE DOWNLOAD: ' + error);
        console.log(error);
        Swal.fire({
          title: 'Erro de download da música',
          text: 'Houve uma falha da tentativa de download da música, tente novamente se persistir o problema entre em contacto com a nossa equipa técnica.',
          icon: 'error',
        });
      }
    } else {
      try {
        Swal.fire({
          title: 'Baixando Arquivo',
          text: 'o arquivo está sendo baixado, mantenha a conexão a Internet, enquanto isso podes continuar a navegar, assim que o download for concluido você será notificado(a).',
          icon: 'info',
        });
        const response = await axios.get(
          `/download-collection/${collection.id}/${collectionType}`,
          {
            responseType: 'blob',
          },
        );

        const blob = new Blob([response.data], {
          type: response.headers['Tontent-Type'],
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = collection.original_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire({
          title: 'Download concluido',
          text: 'A o arquivo foi salvo no seu disopositivo.',
          icon: 'success',
        });
      } catch (error) {
        console.log('ERROR DE DOWNLOAD: ' + error);
        console.log(error);
        Swal.fire({
          title: 'Erro de download de arquivo',
          text: 'Houve uma falha da tentativa de download de um ficheiro, tente novamente se persistir o problema entre em contacto com a nossa equipa técnica.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="mr-3 relative">
      <div>
        <span className="inline-flex rounded-md">
          <button
            type="button"
            onClick={() => {
              showMoreOptions
                ? setShowMoreOptions(false)
                : setShowMoreOptions(true);
            }}
            className="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
          >
            <BiDotsHorizontalRounded
              size={30}
              className=""
              onClick={() => {}}
            />
          </button>
        </span>
        <div
          className={`absolute z-50 bottom-12 -right-2 transition-all  text-xs text-gray-400 bg-white w-[200px] shadow-sm rounded ${
            showMoreOptions ? 'block' : 'hidden'
          } `}
        >
          {/* <!-- Account Management --> */}

          {collection?.title ? (
            <>
              <div className="block px-4 py-2 text-xs text-gray-400">
                Mais opções
              </div>

              <div>
                <button
                  onClick={handleDownload}
                  disabled
                  className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                >
                  Baixar
                </button>{' '}
              </div>
              <div>
                <button
                  onClick={colecionar}
                  className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                >
                  Baixar
                </button>{' '}
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>
                  Comentários
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>
                  Feedbacks
                </DropdownLink>
              </div>
              <div>
                <button
                  onClick={handleDownload}
                  className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                >
                  Baixar
                </button>
              </div>
              <div>
                <DropdownLink href={route('perfis')}>
                  Detalhes da música
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfis')}>
                  Denunciar conteúdo
                </DropdownLink>
              </div>
            </>
          ) : (
            <>Sem música activa</>
          )}

          <div className="border-t border-gray-200 dark:border-gray-600"></div>
        </div>
      </div>
    </div>
  );
}

function Feedback({ song: collection, setOpenModal, collectionType }) {
  return (
    <div className="w-full justify-start p-2 flex flex-col bg-[#4c88c4] ">
      <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Feedback: que dicas, sugestões e opiniões
        </h1>
        <span className="text-xs">
          Só é possóvel deixar um feedback por cada coleção (música, arte,
          vídeo, etc. )podes reenviar um feedback, o anterior será substituido.
        </span>
      </div>
      <div className="my-1 hidden w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Deixe seu comentário, o artista, a comunidade e o globo agradecem.
        </h1>
        <p className="justify w-full text-xl mb-2">
          O artista precisar possuir como parte de sua criatividade empatia e a
          experiência que os possibilitam nos entender em nossas complexidades e
          finalmente nos emocionar. Agora temos a oportunidade de contribuir
          nessa jornada e acelerar o progresso.
        </p>
      </div>
      <FeedbacksSection
        collection={collection}
        collectionType={collectionType}
      />
    </div>
  );
}

function Comentarios({
  song: collection,
  setOpenModal,
  setComments,
  collectionType,
}) {
  return (
    <div className="w-full justify-start p-2 flex flex-col">
      <h1 className="text-center text-base md:text-2xl">
        Comentários da comunidade a coleção <strong>{collection.title}</strong>
      </h1>
      <p className="justify w-full text-xl my-1">
        Partilhe a sua opinião com a comunidade
      </p>

      <CommentsSection
        collection={collection}
        collectionType={collectionType}
      />
    </div>
  );
}
