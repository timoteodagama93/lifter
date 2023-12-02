import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { smalLogo } from '../../../../../img';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import SongEvaluationSetup from './SongEvaluationSetup';
import Interagir from '@/Components/Interagir';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiSend } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import { Loader } from '@/Components';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function ValuationReader({ activeSong: selectedSong }) {
  const [openModal, setOpenModal] = useState(false);
  const { isPlaying, activeSong } = useSelector(state => state.player);
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, songs, i) => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  const [localPage, setLocalPage] = useState(
    <>
      <DisplayComments song={selectedSong} />
    </>,
  );

  let commentsKey = 0o01;
  let feedbacksKey = 0o10;

  return (
    <>
      <div className="w-full h-full flex flex-col overflow-hidden ">
        <div className="w-full h-[35%]  border-b px-1 md:px-5 flex flex-col  justify-between items-center">
          <div className="w-full flex flex-row items-center gap-1 ">
            {selectedSong.cover ? (
              <img
                src={selectedSong?.cover}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img src={smalLogo} alt="" className="w-10 h-10 rounded-full" />
            )}
            <span className="md:flex"> {selectedSong?.artist} </span>
            {selectedSong?.participacoes ? (
              <>
                &
                <span className="md:flex"> {selectedSong?.participacoes} </span>
              </>
            ) : (
              ''
            )}
            |<span className="md:flex"> {selectedSong?.genre} </span>|
            <span className="md:flex">
              {' '}
              {selectedSong?.mime_type.includes('audio')
                ? 'Aúdio'
                : 'Vídeo'}{' '}
            </span>
          </div>

          <div className="w-full flex flex-row gap-1 justify-center items-center">
            <button className="transform-effect p-1 justify-center items-center  flex flex-col">
              {isPlaying && selectedSong?.title === activeSong.title ? (
                <FaPauseCircle
                  size={25}
                  className={`text-gray-300 cursor-pointer ${classNames}`}
                  onClick={handlePauseClick}
                />
              ) : (
                <FaPlayCircle
                  size={25}
                  className={`text-gray-300 cursor-pointer ${classNames}`}
                  onClick={() => handlePlayClick(selectedSong, selectedSong, 0)}
                />
              )}
              <span style={{ fontSize: '.5rem' }} className="hidden md:flex">
                Reproduzir
              </span>
            </button>
            <Interagir song={selectedSong} />{' '}
          </div>
        </div>

        <div className="w-full h-[65%] overflow-y-auto px-1"> {localPage} </div>
      </div>
      {openModal && (
        <SongEvaluationSetup song={selectedSong} onClose={setOpenModal} />
      )}
    </>
  );
}

export default ValuationReader;

const Comentarios = ({ song, setComments }) => {
  const [loadedComments, setLoadedComments] = useState(true);
  const [errorLoadingComments, setErrorLoadingComments] = useState(false);

  function getComments() {
    axios
      .post('get-comments', { song_id: song.id })
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
        form.reset('comment');
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
};

const DisplayComments = ({ song: selectedSong }) => {
  const [comments, setComments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post('get-comments', { song_id: selectedSong.id })
      .then(response => {
        setIsLoading(false);
        setComments(response.data);
      })
      .catch(error => {});
    axios
      .post('feedbacks', { song_id: selectedSong.id })
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {});
  }, [selectedSong]);

  if (isLoading) return <Loader title="Carregando comentários..." />;
  return (
    <>
      {comments.length > 0 ? (
        <>
          {comments?.map(comment => (
            <div className="py-1 " key={comment.id}>
              <p className="w-full p-2 shadow shadow-black bg-green-50 text-black">
                {comment.comment}
                <br />
                <span className="justify-end right-5"> {comment.time} </span>
              </p>
            </div>
          ))}
        </>
      ) : (
        <>
          <h1 className="text-xl text-center">
            Nenhum comentário ou feedback até ao momento
          </h1>
        </>
      )}
    </>
  );
};
