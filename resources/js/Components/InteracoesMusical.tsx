import React, { useState } from 'react';
import { BiLibrary, BiShare } from 'react-icons/bi';
import { MdEmojiEmotions, MdOutlineMessage } from 'react-icons/md';
import { TiMessages } from 'react-icons/ti';
import PrimaryButton from './PrimaryButton';
import { BsEmojiAngry, BsEmojiHeartEyes, BsEmojiKiss } from 'react-icons/bs';
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi';
import Modal from './Modal';
import Checkbox from './Checkbox';
import InputLabel from './InputLabel';

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
        className={`w-full flex ${orientation} justify-center items-center space-x-2 space-y-2`}
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
            setShareModal(true);
            setOpenModal(true);
          }}
        >
          <div className="flex flex-col items-center">
            <BiShare className="text-3xl" />
            <span className="text-xs">Partilhar </span>
          </div>
        </button>
        <button className="" onClick={() => colecionar()}>
          <div className="flex flex-col items-center">
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
        {valuateModal && <Avaliar song={song} />}
        {feedbackModal && <Feedback song={song} />}
        {commentsModal && <Comentarios song={song} />}
        {shareModal && <Partilhar song={song} />}
      </Modal>
    </div>
  );
}

function Avaliar({ song }) {
  const [emotionalValuation, setEmotionalValuation] = useState('happy');
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
      <form
        onSubmit={() => {}}
        className="flex flex-col justify-start text-base items-center p-5 space-y-2"
      >
        <div className="flex flex-col ">
          <label className="" htmlFor="nota">
            Atribua uma nota à música
          </label>
          <input type="range" defaultValue={0} />
        </div>
        <p className="">É uma música para que momentos em termos emocionais?</p>
        <div className="flex text-black flex-row justify-center">
          <button onClick={() => setEmotionalValuation('happy')}>
            <HiOutlineEmojiHappy className="w-16 h-16" /> Felicidade
          </button>
          <button onClick={() => setEmotionalValuation('sad')}>
            <HiOutlineEmojiSad className="w-16 h-16" /> Tristeza
          </button>
          <button onClick={() => setEmotionalValuation('BsEmojiAngry')}>
            <BsEmojiAngry className="w-14 h-14" /> Raíva
          </button>
          <button onClick={() => setEmotionalValuation('BsEmojiKiss')}>
            <BsEmojiKiss className="w-14 h-14" />Amor
          </button>
          <button onClick={() => setEmotionalValuation('BsEmojiHeartEyes')}>
            <BsEmojiHeartEyes className="w-14 h-14" />Amor
          </button>
          <button onClick={() => setEmotionalValuation('MdEmojiEmotions')}>
            <MdEmojiEmotions className="w-14 h-14" />Amor
          </button>
        </div>
        <div>
          <div>
            <input
            type='checkbox'
            className='text-black'
            style={{color:'#000'}} /> Selecione está opção se considerar o conteúdo como
            negativo
          </div>
        </div>
        <PrimaryButton>Avaliar música</PrimaryButton>
      </form>
    </div>
  );
}
function Feedback({ song }) {
  return (
    <div className="w-full">
      <h1 className="texte-center text-xl">Feedback</h1>
    </div>
  );
}
function Comentarios({ song }) {
  return (
    <div className="w-full">
      <h1 className="texte-center text-xl">Comentários</h1>
    </div>
  );
}
function Partilhar({ song }) {
  return (
    <div className="w-full">
      <h1 className="texte-center text-xl">Partilhar</h1>
    </div>
  );
}

export default InteracoesMusical;
