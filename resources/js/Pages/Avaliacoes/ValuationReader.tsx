import React, { useEffect, useState } from 'react';
import {
  BiComment,
  BiLibrary,
  BiSearch,
  BiSend,
  BiShare,
  BiStar,
} from 'react-icons/bi';
import { MdCall, MdOutlineMessage } from 'react-icons/md';
import {
  BsCameraVideo,
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
import { TiMessages } from 'react-icons/ti';
import MusicPlayer from '@/Components/MusicPlayer copy';
import { smalLogo } from '../../../img';
import { Loader } from '@/Components';
import EnviarEstrelas from '@/Components/EnviarEstrelas';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Interagir from '@/Components/Interagir';

function ValuationReader({ activeValuation }) {
  function colecionar() {}
  const [openModal, setOpenModal] = useState(false);
  const [valuateModal, setValuateModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const [comments, setComments] = useState([]);
  const [loadedComments, setLoadedComments] = useState(true);
  const [errorLoadingComments, setErrorLoadingComments] = useState(false);

  useEffect(() => {
    const data = new FormData();
    data.append('song_id', activeValuation.id);
    axios
      .post('get-comments', data)
      .then(response => {
        setComments(response.data);
        setLoadedComments(false);
      })
      .catch(error => {
        setErrorLoadingComments(true);
      });
  }, [activeValuation]);

  return (
    <>
      <div className="w-full h-full flex flex-col overflow-hidden px-5 ">
        <div className="w-full h-[20%]  border-b px-1 md:px-5 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full flex flex-row-reverse md:flex-row items-center gap-1">
            {activeValuation.cover ? (
              <img
                src={activeValuation?.cover}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img src={smalLogo} alt="" className="w-10 h-10 rounded-full" />
            )}
            <span className="md:flex"> {activeValuation?.artist} </span>
          </div>
          <div className="w-full flex flex-row gap-1">
            <Interagir song={activeValuation} />{' '}
          </div>
        </div>

        <div className="w-full h-[80%] overflow-y-auto px-10">
          {comments?.map(mensagem => (
            <div className="py-1 " key={mensagem.id}>
              <p className="w-full p-2 shadow shadow-black bg-green-50 text-black">
                {mensagem.comment}
                <br />
                <span className="justify-end right-5"> {mensagem.time} </span>
              </p>
            </div>
          ))}
        </div>
      </div>
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
        {valuateModal && (
          <Avaliar setOpenModal={setOpenModal} song={activeValuation} />
        )}
        {feedbackModal && (
          <Feedback setOpenModal={setOpenModal} song={activeValuation} />
        )}
        {commentsModal && (
          <Comentarios
            setComments={setComments}
            song={activeValuation}
            setOpenModal={setOpenModal}
          />
        )}
        {shareModal && <Partilhar song={activeValuation} />}
      </Modal>
    </>
  );
}

export default ValuationReader;

function Avaliar({ song, setOpenModal }) {
  const form = useForm({
    song_id: song.id,
    points: 0,
    emotions: 'HiOutlineEmojiHappy',
    negative: false,
    why_negative: '',
  });
  function submit(e) {
    e.preventDefault();
    axios
      .post('share-opinion', form.data)
      .then(response => {
        setOpenModal(false);
        Swal.fire({
          title: 'Avaliação enviada',
          text: 'Obrigado por seu trabalho. Os músicos e os demais usuários agradecem. ',
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
  return (
    <div className="w-full justify-start p-2 flex flex-col">
      <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Jurado, como avalia a música?
        </h1>
        <p>
          Faça uma avaliação com base no conteúdo que ouviu. Avalie em termos
          emocionais, qualidade na produção, conteúdo, etc. E claro, se gostou,
          não se esqueça de partilhar e recomendar.
        </p>
      </div>

      <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Quantas estrelas a música merece?
        </h1>
        <EnviarEstrelas song={song} wich_flex="flex-row " />
      </div>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5 space-y-2"
      >
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
            Qual é a pontuação da música?
          </h1>
          <label className="mx-5" htmlFor="nota">
            {form.data.points + ' '}pontos
          </label>
          <input
            value={form.data.points}
            onChange={e =>
              form.setData('points', Number.parseInt(e.target.value))
            }
            type="range"
          />
        </div>
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
            para que tipo de emoção é a música?
          </h1>
          <div className="w-full gap-1 flex flex-row justify-center">
            <span
              className={`cursor-pointer ${
                form.data.emotions === 'HiOutlineEmojiHappy'
                  ? 'text-[#f6cc33]'
                  : ''
              } `}
              onClick={() => form.setData('emotions', 'HiOutlineEmojiHappy')}
            >
              <HiOutlineEmojiHappy className="w-16 h-16" /> Felicidade
            </span>
            <span
              className={`cursor-pointer ${
                form.data.emotions === 'HiOutlineEmojiSad'
                  ? 'text-[#f6cc33]'
                  : ''
              } `}
              onClick={() => form.setData('emotions', 'HiOutlineEmojiSad')}
            >
              <HiOutlineEmojiSad className="w-16 h-16" /> Tristeza
            </span>
            <span
              className={`cursor-pointer ${
                form.data.emotions === 'BsEmojiAngry' ? 'text-[#f6cc33]' : ''
              } `}
              onClick={() => form.setData('emotions', 'BsEmojiAngry')}
            >
              <BsEmojiAngry className="w-14 h-14" /> Raíva
            </span>
            <span
              className={`cursor-pointer ${
                form.data.emotions === 'BsEmojiKiss' ? 'text-[#f6cc33]' : ''
              } `}
              onClick={() => form.setData('emotions', 'BsEmojiKiss')}
            >
              <BsEmojiKiss className="w-14 h-14" />
              Paixão
            </span>
            <span
              className={`cursor-pointer ${
                form.data.emotions === 'BsEmojiHeartEyes'
                  ? 'text-[#f6cc33]'
                  : ''
              } `}
              onClick={() => form.setData('emotions', 'BsEmojiHeartEyes')}
            >
              {' '}
              <BsEmojiHeartEyes className="w-14 h-14" />
              Amor
            </span>
          </div>
        </div>
        <div>
          <div className="my-4 bg-black text-white w-full rounded p-2">
            <input
              value={form.data.negative}
              onChange={e => {
                if (form.data.negative == false) {
                  form.setData('negative', true);
                } else {
                  form.setData('negative', false);
                }
              }}
              type="checkbox"
              className="bg-white text-black p-2"
            />{' '}
            <label>
              Selecione está opção se considerar o conteúdo como negativo e
              impróprio
            </label>
            {form.data.negative === true && (
              <div className="w-full flex text-black">
                <input
                  value={form.data.why_negative}
                  onChange={e => form.setData('why_negative', e.target.value)}
                  className="w-full"
                  type="text"
                  placeholder="Justifique por qual razão o conteúdo é negativo."
                />
              </div>
            )}
          </div>
        </div>
        <PrimaryButton>Concluir avaliação</PrimaryButton>
      </form>
    </div>
  );
}

function Feedback({ song, setOpenModal }) {
  const form = useForm({
    song_id: song.id,
    feedback: '',
    public: false,
  });
  function submit(e) {
    e.preventDefault();
    axios
      .post('share-feedback', form.data)
      .then(response => {
        setOpenModal(false);
        Swal.fire({
          title: 'Feedback enviado',
          text: `Obrigado por seu trabalho. O artista, ${song.artist} , será notificado. Acreditamos que é graças a esses feedbacks que os artistas farão cada vez mais trabalhos melhores. `,
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

  return (
    <div className="w-full justify-start p-2 flex flex-col bg-[#4c88c4] ">
      <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Jurado, que dicas, sugestões e opiniões pode deixar para{' '}
          <strong>{song.artist}</strong> ?
        </h1>
        <p className="justify w-full text-xl my-5">
          Os músicos dedicam seu tempo na criação de trabalhos que nos
          acompanham em diferentes momentos de nossas vidas
        </p>
      </div>
      <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Deixe seu comentário, o artista, a comunidade e o globo agradecem.
        </h1>
        <p className="justify w-full text-xl mb-2">
          O artista precisar possuir como parte de sua criatividade empatia e a
          experiência que os possibilitam nos entender (ouvintes) em nossas
          complexidades e finalmente nos emocionar. Agora temos a oportunidade
          de contribuir nessa jornada e acelerar o progresso.
        </p>
      </div>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5 space-y-2"
      >
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
            Feedback
          </h1>
          <label className="mx-5" htmlFor="feedback">
            Deixe um feedback útil e construtivo ao músico, seja sincero.
          </label>
          <textarea
            className="text-black"
            value={form.data.feedback}
            onChange={e => form.setData('feedback', e.target.value)}
            rows={5}
            required
          ></textarea>
        </div>
        <div className="my-4 bg-white text-black w-full flex gap-1 items-center rounded p-2">
          <input
            value={form.data.public}
            onChange={e => {
              if (form.data.public == false) {
                form.setData('public', true);
              } else {
                form.setData('public', false);
              }
            }}
            type="checkbox"
            className="text-[#4c88c4] p-3 transform-effect"
          />{' '}
          <label>
            Selecione, se gostaria de deixar o seu feedback seja público. Fora o
            artista, todos os usuários podem lê-lo.
          </label>
        </div>
        <button className="transform-effect p-5 font-bold">
          Enviar Feedback
        </button>
      </form>
    </div>
  );
}

function Comentarios({ song, setOpenModal, setComments }) {
  const [loadedComments, setLoadedComments] = useState(true);
  const [errorLoadingComments, setErrorLoadingComments] = useState(false);

  function getComments() {
    const data = new FormData();
    data.append('song_id', song.id);
    axios
      .post('get-comments', data)
      .then(response => {
        setComments(response.data);
        setLoadedComments(false);
      })
      .catch(error => {
        setErrorLoadingComments(true);
      });
  }

  const form = useForm({
    song_id: song.id,
    comment: '',
    public: false,
  });

  function submit(e) {
    e.preventDefault();
    axios
      .post('share-comment', form.data)
      .then(response => {
        form.setData('comment', '');
        form.setData('public', true);
        getComments();
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência. Se persistir, relate o problema.',
          icon: 'error',
        });
      });
  }

  useEffect(getComments, []);
  return (
    <div className="w-full justify-start p-2 flex flex-col">
      <h1 className="text-center text-base md:text-2xl">
        Comentários dos jurados da música <strong>{song.title}</strong>
      </h1>
      <p className="justify w-full text-xl my-1">
        Partilhe a sua opinião com a comunidade
      </p>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5"
      >
        <div className="w-full p-2 rounded bg-black text-white flex-col ">
          <h1 className="text-xl">Comentário</h1>
          <label className="mx-5" htmlFor="comment">
            Comente ou inicie uma discussão!.
          </label>
          <div className="w-full flex flex-row">
            <textarea
              className="text-black w-full"
              value={form.data.comment}
              onChange={e => form.setData('comment', e.target.value)}
              rows={2}
              required
            ></textarea>
            <PrimaryButton disabled={form.processing}>
              <BiSend className="w-10 h-10" />
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}

function UserComment({ userId }) {
  if (userId === null) return;
  const [user, setuser] = useState();

  function getCommentUser(userId) {
    const data = new FormData().append('id', userId);
    axios.post('get-comment-user', data).then(response => {
      setuser(response.data);
    });
  }

  useEffect(getCommentUser(userId), []);
  return (
    <>
      <div>{user?.name}</div>
    </>
  );
}

function Partilhar({ song }) {
  return (
    <div className="w-full">
      <h1 className="texte-center text-xl"></h1>
    </div>
  );
}
