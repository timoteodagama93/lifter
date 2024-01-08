import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import PlayPause from './PlayPause';
import Detalhar from '@/Pages/Detalhar';
import { MdCloseFullscreen, MdDetails } from 'react-icons/md';
import Modal from './Modal';
import axios from 'axios';
import SongCard from './SongCard';
import { useDispatch, useSelector } from 'react-redux';
import ContestSongCard from './ContestSongCard';
import Interagir from './Interagir';
import { FaVoteYea } from 'react-icons/fa';
import { GiVote } from 'react-icons/gi';
import { BiInfoCircle } from 'react-icons/bi';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import Swal from 'sweetalert2';
import VideoCard from './VideoCard';
import VideoCardGrelha from './VideoCardGrelha';
import VideoCardGrelhaContest from './VideoCardGrelhaContest';
import ExpositionRoom from '@/Pages/Arts/ExpositionRoom';
import CardObra from './CardObra';

const ParticipantCard = ({ song: participant, songs, i, contest }) => {
  const [seeArtistDetails, setSeeArtistDetails] = useState(false);
  const { activeSong, activeVideo, isPlaying, isPlayingVideo } = useSelector(
    state => state.player,
  );
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    if (contest.categoria == 'Música') {
      axios
        .post('get-artist', { artist_id: participant.artist_id })
        .then(response => {
          setOwner(response.data);
        })
        .catch(error => {});
    } else {
      axios
        .post('get-contestant-details', { user_id: participant.user_id })
        .then(response => {
          setOwner(response.data);
        })
        .catch(error => {});
    }
  }, []);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song: participant, songs, i }));
    dispatch(playPause(true));
  };

  const [isMyVotedSong, setIsMyVotedSong] = useState(false);

  useEffect(() => {
    axios
      .post('i-voted-on-this', {
        song_id: participant.song_id,
        contest_id: participant.contest_id,
      })
      .then(response => {
        if (response.data.length > 0) setIsMyVotedSong(true);
      })
      .catch(error => {});
  }, []);

  const handleVote = () => {
    axios
      .post('vote-on-participant', {
        collection_id: participant.song_id,
        contest_id: participant.contest_id,
      })
      .then(response => {
        console.log('RESPONSE AFTER VOTE:' + response.data);
        console.log(response.data);
        Swal.fire({
          title: 'Voto registrado',
          text: 'O seu voto foi registrado, só é possível votar em um único participante por concurso, se você votar em outro participante, o voto actual será descartado, apenas o último voto será contabilizado.',
          icon: 'success',
        });
      })
      .catch(errors => {
        Swal.fire({
          title: 'Falha ao votar',
          text: 'Houve um problema e não foi possível registrar sua opção de voto, tente novamente se o erro continuar reporte-o.',
          icon: 'error',
        });
      });
  };

  return (
    <>
      <Modal
        isOpen={seeArtistDetails}
        onClose={() => setSeeArtistDetails(false)}
      >
        <div className="w-full h-full flex flex-col bg-[#4c88c4] ">
          <div className="w-full ">
            <button
              onClick={() => setSeeArtistDetails(false)}
              className="p-5 transform-effect w-fit right-1 top-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <div className="w-full flex float-right justify-end">
            <Detalhar prof={owner} />
          </div>
        </div>
      </Modal>

      <div className="w-full h-full flex flex-col items-center overflow-hidden shadow-lg p-1">
        {contest.categoria == 'Música' && (
          <>
            {participant?.mime_type.includes('audio/') ? (
              <ContestSongCard
                w="w-full"
                song={participant}
                isPlaying={isPlaying}
                activeSong={activeSong}
                songs={songs}
                i={i}
              />
            ) : (
              <VideoCardGrelhaContest
                w="w-full"
                video={participant}
                isPlayingVideo={isPlayingVideo}
                activeVideo={activeVideo}
                videos={songs}
                i={i}
              />
            )}
          </>
        )}
        {contest.categoria == 'Artes Visuais' && (
          <CardObra w="w-full" obra={participant} />
        )}

        <div className="w-full flex flex-col ">
          <div className="w-full flex flex-row mt-2 ">
            <button
              onClick={handleVote}
              className={`transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-row text-xl justify-center items-center mx-1 border-b-2 backdrop-blur-lg p-1 my-1 gap-1 ${
                isMyVotedSong ? 'bg-purple-400' : ''
              } `}
              disabled={isMyVotedSong ? true : false}
            >
              <FaVoteYea className="w-10 h-10" />
              {isMyVotedSong ? 'Voto actual' : ` Votar`}
            </button>
            <button
              onClick={() => {
                setSeeArtistDetails(true);
              }}
              className="transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-row text-xl justify-center items-center mx-1 border-b-2 backdrop-blur-lg p-1 my-1 gap-1"
            >
              <BiInfoCircle className="w-10 h-10" />
              Sobre
            </button>
          </div>
          <div className="w-full flex flex-row m-1 justify-center items-center gap-1 ">
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
              song={participant}
              key={i}
            />
            {contest.categoria == 'Música' && <Interagir song={participant} />}
          </div>
          <div className="w-full flex flex-row rounded-lg  object-contain border-b-2 backdrop-blur-lg ">
            <div className="w-12 h-12 rounded-full  object-contain ">
              <img
                src={owner?.url_cover}
                alt="name artist"
                onClick={() => {
                  setSeeArtistDetails(true);
                }}
                className=" hover:cursor-pointer w-full h-full rounded-full border-t-2 border-b-2  object-cover"
              />
            </div>
            <div
              onClick={() => {
                setSeeArtistDetails(true);
              }}
              className=" w-full h-[10%]  rounded-lg flex-1 space-x-1 flex flex-row justify-start items-center mx-3  p-1 gap-2 "
            >
              <p className="text-xl font-bold text-white"> {owner?.name} </p>|
              <p className="text-xs text-gray-300">
                {' '}
                {contest.categoria == 'Música' ? owner?.genres : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantCard;
