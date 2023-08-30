import React, { useState } from 'react';
import { destaques, songs } from '../../../data/dummy';
import { MdOutlineMessage } from 'react-icons/md';
import {
  BiDislike,
  BiLibrary,
  BiLike,
  BiSend,
  BiShare,
  BiUser,
} from 'react-icons/bi';
import {
  BsEmojiAngry,
  BsEmojiExpressionless,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
  BsEmojiSmile,
  BsSend,
} from 'react-icons/bs';
import { TiMessages } from 'react-icons/ti';
import Modal from '@/Components/Modal';
import { FaUser, FaUserInjured } from 'react-icons/fa';
import PlayPause from '@/Components/PlayPause';
import './destaques.css';
import {
  HiEmojiHappy,
  HiOutlineEmojiHappy,
  HiOutlineEmojiSad,
} from 'react-icons/hi';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import InteracoesMusical from '@/Components/InteracoesMusical';
function Destaques() {
  const [selectedPosition, setSelectedPosition] = useState(0);
  return (
    <div className="flex p-1 flex-col md:flex-row-reverse md:justify-between">
      <div className="w-full md:w-10/12 flex flex-col">
        <ItemSelecionado
          list_items={songs}
          selected={selectedPosition}
          isVideo={false}
        />
      </div>
      <div className="w-full md:w-2/12 h-2/6 md:h-[80vh] flex flex-row md:flex-col justify-start items-start  md:overflow-auto overflow-x-auto lg:px-2 lg:space-y-1">
        {songs.map((song, i) => (
          <>
              <img
                onClick={() => setSelectedPosition(i)}
                className="flex md:hidden w-1/4 h-2/6 cursor-pointer"
                src={song.images.coverart}
              />
            <div className="hidden w-1/4 md:flex flex-row h-[10vh] md:w-full md:h-full cursor-pointer p-1">
              <img
                onClick={() => setSelectedPosition(i)}
                className="w-full h-full cursor-pointer"
                src={song.images.coverart}
              />
            </div>
            {/*}
              <div className="w-full hidden md:flex flex-row space-x-1 justify-start items-center bottom-1 left-0">
                <img
                  className="h-5 w-5 rounded-full"
                  src={song.images.artistImage}
                  />
                <p> {song.subtitle} </p>
              </div>
                  {*/}
          </>
        ))}
      </div>
    </div>
  );
}

export default Destaques;

function ItemSelecionado({ list_items, selected, isVideo }) {
 
  return (
    <>
      <div className="flex flex-row">
        {/**ÁREA DE APRESENTAÇÃO DE IMAGEM/VÍDEO */}
        <div className="w-full md:px-5 md:h-[100vh] xl:h-[99%] xl:w-[65%] justify-center items-center ">
          {isVideo ? (
            <VideoItem song={list_items[selected]} />
          ) : (
            <div className="image-gallery">
              <div className="column">
                <div className="image-item">
                  <img
                    className=" lg:px-5"
                    src={list_items[selected].images.coverart}
                    alt=""
                  />
                  <div className="overlay" onClick={() => {}}>
                    <span>
                      <PlayPause />
                    </span>
                    <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                      <span className="text-xl">
                        {' '}
                        {list_items[selected].title}{' '}
                      </span>
                      <div className="flex flex-row space-x-1 text-xs">
                        <div className="h-10 w-10 flex flex-row">
                          <img
                            onClick={() => {}}
                            src={list_items[selected].images.artistImage}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start">
                          <span className="text-base">
                            {list_items[selected].subtitle}
                          </span>
                          <span className="text-xs">
                            {list_items[selected].genero}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/** BOTÕES */}
        <div className="xl:w-[10%] h-full flex justify-center items-center">
          <InteracoesMusical song={list_items[selected]} />
        </div>
        {/** COMENTÁRIOS, SOMENTE PARA DISPOSITIVOS GRANDES XL: */}
        <div className="pl-2 h-full border-l-2 border-[#2c2c2c] xl:w-[25%] hidden xl:flex flex-col">
          <h1 className="text-center w-full text-bold">Comentários</h1>
          <form className="flex flex-row justify-center items-center">
            <textarea
              placeholder="Comentar"
              maxLength={150}
              rows={7}
              cols={100}
              className="text-xs rounded justify-center items-center"
            ></textarea>
            <button className="text-4xl ">
              {' '}
              <BiSend />{' '}
            </button>
          </form>
          <div className="relative h-[60vh] overflow-y-auto flex flex-col justify-start items-start p-5 space-y-2 ">
            {/**Comentário */}
            <div className="flex flex-row items-center ">
              <p
                placeholder="Comentar"
                className="relative flex text-xs rounded text-justify"
              >
                Acho que a música até é boa mas falta-lhe alguma coisa. Podiam
                melhorar a mas
              </p>
              <button className="text-4xl ">
                {' '}
                <FaUser />{' '}
              </button>
            </div>
            <div className="flex flex-row items-center ">
              <button className="text-4xl ">
                {' '}
                <FaUser />{' '}
              </button>
              <p
                placeholder="Comentar"
                className="relative flex text-xs rounded text-justify"
              >
                Acho que a música até é boa mas falta-lhe alguma coisa. Podiam
                melhorar a mas s ajsjasjasa ajsajsasa jjerjer jerjerehrj
                ejhrehregrh hergehregrh hehreg
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
  function VideoItem({ song }) {
    return (
      <div className="image-gallery">
        <div className="column">
          <div className="image-item">
            <video controls>
              <source
                type="video/mp4"
                className=" lg:px-5"
                src="videos/css.mp4"
              />
            </video>
          </div>
          <div className="text-white flex flex-col">
            <p className="font-semibold text-lg  truncate">
              <Link href={`/song-details/${song?.id}`}>{song.title}</Link>
            </p>
            <p className="text-sm truncate  mt-1">
              <Link
                href={
                  song.artist
                    ? `/artists/${song?.subtitle.adamid}`
                    : 'top-artists'
                }
              >
                {song.subtitle}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
 
}
