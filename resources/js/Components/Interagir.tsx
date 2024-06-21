import React, { useEffect, useState } from 'react';
import { BiDownload, BiLibrary, BiStar } from 'react-icons/bi';
import { MdOutlineCloseFullscreen, MdOutlineMessage } from 'react-icons/md';
import { TiMessages } from 'react-icons/ti';
import PrimaryButton from './PrimaryButton';
import {
  BsEmojiAngry,
  BsEmojiHeartEyes,
  BsEmojiKiss,
  BsShare,
} from 'react-icons/bs';
import {
  HiHeart,
  HiOutlineEmojiHappy,
  HiOutlineEmojiSad,
} from 'react-icons/hi';
import Modal from './Modal';
import EnviarEstrelas from './EnviarEstrelas';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FeedbacksSection from './FeedbacksSection';
import CommentsSection from './CommentsSection';
import Valuate from './Valuate';

function Interagir({
  song: Collection,
  collectionType = 'song',
  orientation = 'flex-row',
}) {
  const [openModal, setOpenModal] = useState(false);
  const [valuateModal, setValuateModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [liked, setLiked] = useState(false);

  function curtir() {
    if (collectionType == 'song') {
      axios
        .post('like-song', { song_id: Collection.id })
        .then(response => {
          setLiked(true);
        })
        .catch(error => {
          Swal.fire({
            title: 'Erro',
            text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência.',
            icon: 'error',
          });
        });
    } else {
      axios
        .post('like-collection', {
          collection_id: Collection.id,
          collection_type: collectionType,
        })
        .then(response => {
          setLiked(true);
        })
        .catch(error => {
          Swal.fire({
            title: 'Erro',
            text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência.',
            icon: 'error',
          });
        });
    }
  }

  function isLikedSong() {
    axios
      .post('i-liked', {
        collection_id: Collection.id,
        collection_type: collectionType,
      })
      .then(response => {
        if (response.data.length > 0) {
          setLiked(true);
        }
      })
      .catch(error => {});
  }
  useEffect(() => {
    isLikedSong();
  }, [Collection]);

  function colecionar() {
    axios
      .post('collect-song', {
        song_id: Collection.id,
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
        const response = await axios.get(`/download/song/${Collection.id}`, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], {
          type: response.headers['Tontent-Type'],
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = Collection.original_name;
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
          title: 'Baixando aRQUIVO',
          text: 'o arquivo está sendo baixado, mantenha a conexão a Internet, enquanto isso podes continuar a navegar, assim que o download for concluido você será notificado(a).',
          icon: 'info',
        });
        const response = await axios.get(
          `/download-collection/${Collection.id}/${collectionType}`,
          {
            responseType: 'blob',
          },
        );

        const blob = new Blob([response.data], {
          type: response.headers['Tontent-Type'],
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = Collection.original_name;
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

  const [openValuate, setOpenValuation] = useState(false);

  return (
    <div>
      <div
        className={`w-full flex ${orientation} justify-center items-center smooth-transition gap-1 p-1`}
      >
        <button
          className="text-lg md:text-3xl transform-effect p-1"
          onClick={() => {
            setOpenValuation(true);
          }}
        >
          {' '}
          <BiStar />{' '}
        </button>
        <button
          className="text-lg md:text-3xl transform-effect p-1"
          onClick={handleDownload}
        >
          <BiDownload />
        </button>
        <button
          onClick={() => curtir()}
          className={`text-lg md:text-3xl transform-effect p-1 ${
            liked ? 'bg-purple-400 text-white ' : ''
          } `}
        >
          {' '}
          <HiHeart />{' '}
        </button>
        <button
          className="text-lg md:text-3xl transform-effect p-1"
          onClick={() => {
            setOpenModal(false);
            setShareModal(false);
            setCommentsModal(false);
            setValuateModal(false);

            setFeedbackModal(true);
            setOpenModal(true);
          }}
        >
          <MdOutlineMessage />
        </button>
        <button
          className="text-lg md:text-3xl transform-effect p-1"
          onClick={() => {
            setOpenModal(false);
            setShareModal(false);
            setFeedbackModal(false);
            setValuateModal(false);

            setCommentsModal(true);
            setOpenModal(true);
          }}
        >
          <TiMessages />
        </button>

        <button
          className="text-lg md:text-3xl transform-effect p-1"
          onClick={() => {
            setOpenModal(false);
            setCommentsModal(false);
            setFeedbackModal(false);
            setValuateModal(false);

            setShareModal(false);
            setOpenModal(false);
          }}
        ></button>
        <button
          className="text-lg md:text-3xl transform-effect p-1"
          onClick={() => colecionar()}
        >
          <BiLibrary />
        </button>
      </div>

      <Valuate
        collectionType="song"
        collection={Collection}
        isOpen={openValuate}
        onClose={setOpenValuation}
      />
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setShareModal(false);
          setCommentsModal(false);
          setFeedbackModal(false);
          setValuateModal(false);
        }}
      >
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
            <button
              onClick={() => setOpenModal(false)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
            </button>
            <span>Interagir com conteúdo</span>
          </h1>

          {feedbackModal && (
            <Feedback
              collectionType={collectionType}
              setOpenModal={setOpenModal}
              song={Collection}
            />
          )}
          {commentsModal && (
            <Comentarios
              setComments={{}}
              song={Collection}
              collectionType={collectionType}
              setOpenModal={setOpenModal}
            />
          )}
          {shareModal && (
            <Partilhar collectionType={collectionType} song={Collection} />
          )}
        </div>
      </Modal>
    </div>
  );
}

function Avaliar({ song: collection, setOpenModal, collectionType }) {
  const form = useForm({
    collection_id: collection.id,
    collection_type: collectionType,
    points: 0,
    emotions: 'HiOutlineEmojiHappy',
    negative: false,
    why_negative: 'NULL',
  });
  function submit(e) {
    e.preventDefault();
    form.post('valuate-colletion', {
      onSuccess: response => {
        setOpenModal(false);
        Swal.fire({
          title: 'Avaliação enviada',
          text: 'Obrigado por seu trabalho. O criador e os demais usuários agradecem. ',
          icon: 'success',
        });
      },
      onError: error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência.',
          icon: 'error',
        });
      },
    });
  }
  return <></>;
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

function Partilhar({ song, collectionType }) {
  return (
    <div className="w-full">
      <h1 className="texte-center text-xl"></h1>
    </div>
  );
}

export default Interagir;
