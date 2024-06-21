import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import { MdEvent, MdMasks, MdRadio, MdStadium } from 'react-icons/md';
import { BiBeer, BiRestaurant, BiTv } from 'react-icons/bi';

function ChannelsOfColaboration({ collectionId, collectionType = 'song' }) {
  return (
    <>
      <div className="w-full justify-start p-2 flex flex-col">
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
            Seleção de canais.
          </h1>
          <p>
            Informe-nos com quais canais estará disponível para disseminar a
            informação do artista.
          </p>
        </div>

        <form
          onSubmit={e => submit(e)}
          className="w-full flex flex-col justify-start text-base items-center p-5 space-y-2"
        >
          <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Quuais são os canais nos quais pode partilhar?
            </h1>
            <p className="text-base md:text-lg">
              Selecione todos os aplicáveis.
            </p>
            <div className="w-full   flex flex-col justify-start items-center text-xl ">
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <FaFacebook className="w-5 h-5" />{' '}
                  <span className="text-2xl">Facebook</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <FaInstagram className="w-5 h-5" />{' '}
                  <span className="text-2xl">Instagram</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <FaYoutube className="w-5 h-5" />{' '}
                  <span className="text-2xl">Youtube</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <FaTiktok className="w-5 h-5" />{' '}
                  <span className="text-2xl">Tiktok</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <MdRadio className="w-5 h-5" />{' '}
                  <span className="text-2xl">Rádio</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <BiTv className="w-5 h-5" />{' '}
                  <span className="text-2xl">Televisão</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <MdEvent className="w-5 h-5" />{' '}
                  <span className="text-2xl">Num evento</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <MdStadium className="w-5 h-5" />{' '}
                  <span className="text-2xl">Espaço de eventos</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <BiBeer className="w-5 h-5" />{' '}
                  <span className="text-2xl">Bar</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <BiRestaurant className="w-5 h-5" />{' '}
                  <span className="text-2xl">Restaurante</span>
                </label>
              </div>
              <div className="w-full gap-6 flex flex-row justify-start items-center text-xl ">
                <input type="checkbox" name="fb" id="fb" />{' '}
                <label
                  className="flex gap-2 justify-center items-center"
                  htmlFor="fb"
                >
                  <MdMasks className="w-5 h-5" />{' '}
                  <span className="text-2xl">Espaço cultural</span>
                </label>
              </div>
            </div>
          </div>

          {/*}
          <PrimaryButton>Salvar configuração</PrimaryButton>
          {*/}
        </form>
      </div>
    </>
  );
}

export default ChannelsOfColaboration;
