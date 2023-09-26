import React, { useEffect, useState } from 'react';
import { BiLibrary, BiSend, BiShare } from 'react-icons/bi';
import { MdEmojiEmotions, MdOutlineMessage } from 'react-icons/md';
import { TiMessages } from 'react-icons/ti';
import PrimaryButton from './PrimaryButton';
import { BsEmojiAngry, BsEmojiHeartEyes, BsEmojiKiss } from 'react-icons/bs';
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi';
import Modal from './Modal';
import Checkbox from './Checkbox';
import InputLabel from './InputLabel';
import EnviarEstrelas from './EnviarEstrelas';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from './Loader';
import { comment } from 'postcss';

function InteracoesMusical({ song, orientation = 'flex-col' }) {
  function colecionar() {}
  const [openModal, setOpenModal] = useState(false);
  const [valuateModal, setValuateModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  return (
    <div>
      <div
        className={`w-full flex ${orientation} justify-center items-center space-x-2 space-y-2 smooth-transition`}
      >
        <button
          className=""
          onClick={() => {
            setValuateModal(true);
            setOpenModal(true);
          }}
        >
          <div className="flex flex-col items-center">
            <img src="img/emoji/smile_ok.png" height="30px" width="50px" />
            <span className="text-xs">Avaliar </span>
          </div>
        </button>
        <button
          className=""
          onClick={() => {
            setFeedbackModal(true);
            setOpenModal(true);
          }}
        >
          <div className="flex flex-col items-center">
            <MdOutlineMessage className="text-3xl" />
            <span className="text-xs">Feedback</span>
          </div>
        </button>
        <button
          className=""
          onClick={() => {
            setCommentsModal(true);
            setOpenModal(true);
          }}
        >
          <div className="flex flex-col items-center">
            <TiMessages className="text-3xl" />
            <span className="text-xs">Comentários </span>
          </div>
        </button>
        <button
          className=""
          onClick={() => {
            setShareModal(false);
            setOpenModal(false);
            Swal.fire({
              title: 'Brevemente',
              text: 'Brevemente vai ser possível partilhar com o Facebook, Youtube e TikTok. Até lá, esteja atento às novidades.',
              icon: 'info',
            });
          }}
        >
          <div className="flex flex-col items-center">
            <BiShare className="text-3xl" />
            <span className="text-xs">Partilhar </span>
          </div>
        </button>
        <button className="" onClick={() => colecionar()}>
          <div className="hidden flex flex-col items-center">
            <BiLibrary className="text-3xl" />
            <span className="text-xs">Colecionar </span>
          </div>
        </button>
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
        {valuateModal && <Avaliar setOpenModal={setOpenModal} song={song} />}
        {feedbackModal && <Feedback setOpenModal={setOpenModal} song={song} />}
        {commentsModal && (
          <Comentarios song={song} setOpenModal={setOpenModal} />
        )}
        {shareModal && <Partilhar song={song} />}
      </Modal>
    </div>
  );
}

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
      <h1 className="text-center text-xl md:text-4xl">
        Jurado, como avalia música?
      </h1>
      <p className="w-full text-xl">
        Faça uma avaliação com base no conteúdo que ouviu. Avalie em termos
        emocionais, qualidade na produção, conteúdo, etc. E claro, se gostou,
        não se esqueça de partilhar e recomendar.
      </p>
      <div className="my-4 bg-black flex flex-col rounded">
        <h1 className="text-xl text-center text-white">
          Quantas estrelas a música merece?
        </h1>
        <EnviarEstrelas song={song} wich_flex="flex-row " />
      </div>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5 space-y-2"
      >
        <div className="w-full my-4 p-2 rounded bg-black text-white flex flex-col">
          <h1 className="text-center text-xl">Qual é a pontuação da música?</h1>
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
        <div className="my-4 w-full flex flex-col p-2 rounded bg-black text-white">
          <h1 className="">para que tipo de emoção é a música?</h1>
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
    <div className="w-full justify-start p-2 flex flex-col">
      <h1 className="text-center text-xl md:text-4xl">
        Jurado, que dicas, sugestões e opiniões pode deixar para{' '}
        <strong>{song.artist}</strong> ?
      </h1>
      <p className="justify w-full text-xl my-5">
        Os músicos dedicam seu tempo na criação de trabalhos que nos acompanham
        em diferentes momentos de nossas vidas
      </p>
      <p className="justify w-full text-xl mb-2">
        Tudo parte de sua criatividade e evolução que lhes trás a experiência
        necessária para nos entender em nossas complexidades e finalmente nos
        emocionar. Agora temos a oportunidade de contribuir nessa jornada e
        acelerar o progresso.
      </p>
      <p className="text-xl w-full">
        Deixe seu comentário, o artista, a comunidade e o globo agradecem.
      </p>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5 space-y-2"
      >
        <div className="w-full my-4 p-2 rounded bg-black text-white flex flex-col">
          <h1 className="text-xl">Feedback</h1>
          <label className="mx-5" htmlFor="feedback">
            Deixe um feedback que possa ser útil ao músico.
          </label>
          <textarea
            className="text-black"
            value={form.data.feedback}
            onChange={e => form.setData('feedback', e.target.value)}
            rows={5}
            required
          ></textarea>
        </div>
        <div className="my-4 bg-black text-white w-full rounded p-2">
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
            className="bg-white text-black p-2"
          />{' '}
          <label>
            Selecione, se gostaria de deixar o seu feedback seja público. Fora o
            artista, todos os usuários podem lê-lo.
          </label>
        </div>
        <PrimaryButton>Concluir avaliação</PrimaryButton>
      </form>
    </div>
  );
}

function Comentarios({ song, setOpenModal }) {
  const [comments, setComments] = useState();

  function getComments() {
    const data = new FormData();
    data.append('song_id', song.id);
    axios.post('get-comments', data).then(response => {
      let c = [];
      console.log(response);
      response.data.map(cc => c.push(cc));
      setComments(c);
      console.log(c);
      console.log(response);
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
        setComments(response.data);
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência. Se persistir, relate o problema.',
          icon: 'error',
        });
      });
  }

  const [loadedComments, setLoadedComments] = useState(false);
  console.log(comments);
  const initials = () => {
    if (comments?.length > 0) {
      setLoadedComments(true);
    }
  };

  useEffect(getComments, []);
  useEffect(initials, [comments]);
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
      <div>
        {loadedComments ? (
          comments?.map(comment => (
            <div className="flex flex-col">
              <p>{comment?.comment}</p>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
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

export default InteracoesMusical;
