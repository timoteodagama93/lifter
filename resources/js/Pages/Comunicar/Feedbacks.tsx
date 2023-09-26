import React, { useState } from 'react';
import { BiDotsHorizontal, BiSearch } from 'react-icons/bi';
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs';
import { chats_notifications, messages } from '../../../data/dummy';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ChatItemList from '@/Components/ChatItemList';
import ConversationReader from '@/Components/ConversationReader';
import { MdCall } from 'react-icons/md';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import SweetAlert2 from 'react-sweetalert2';

function Feedbacks() {
  const { currentPage } = useStateContext();
  const [swalProps, setSwalProps] = useState({});
  const form = useForm({
    type: 'erro',
    message: '',
    error_page: '',
  });
  function submit(e) {
    axios
      .post('notification-to-lifter', form.data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-center text-2xl justify-start shadow animate-[flow] ">
        Deixe um comentário, sugestão ou reporte algum problema no funcionamento
        da plataforma.
      </h1>

      {/**Área de leitura de mensagens */}
      <div className="w-full px-5 h-full">
        <div className="w-full shadow-sm shadow-[#4c88c4] p-5  flex flex-row justify-between items-center">
          <form
            onSubmit={e => {
              e.preventDefault();
              submit(e);
            }}
            className="w-full text-black"
          >
            <div className="w-full flex flex-col px-10 justify-start items-center gap-1">
              <label htmlFor="type" className=" text-white">
                Tipo de feedback
              </label>
              <select
                value={form.data.type}
                onChange={e => form.setData('type', e.target.value)}
                id="type"
                name="type"
                required
                className="w-full"
              >
                <option value="erro">Reportar erro</option>
                <option value="comentario">Comentário à equipa</option>
                <option value="sugestao">Sugestão</option>
                <option value="outro">Outra razão</option>
              </select>

              {form.data.type == 'erro' ? (
                <>
                  <label htmlFor="error_page" className=" text-white">
                    Página da platafforma em que registrou o erro
                  </label>
                  <select
                    value={form.data.error_page}
                    onChange={e => form.setData('error_page', e.target.value)}
                    id="error_page"
                    name="error_page"
                    className="w-full"
                  >
                    <option value="home">Home</option>
                    <option value="ranking">Ranking</option>
                    <option value="noticias">Notícias</option>
                    <option value="comunicacoes">Comunicações</option>
                    <option value="comunicacoes">Gospel</option>
                    <option value="comunicacoes">Concursos</option>
                    <option value="outro">Outro local</option>
                  </select>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="flex py-1 flex-col px-10 justify-start items-center gap-1">
              <textarea
              required
                value={form.data.message}
                onChange={e => form.setData('message', e.target.value)}
                name="message"
                id="message"
                className="w-full h-fit"
                rows={7}
                placeholder="Mensagem..."
              ></textarea>
            </div>
            <div className="w-full justify-center flex">
              <PrimaryButton>Enviar Feedback</PrimaryButton>
            </div>
          </form>
        </div>
        <p className="text-xl px-5 py-1y my-1">
          Estamos a trabalhar arduamente para lhe entregarmos a melhor
          experiência, vai ser mais fácil se contarmos com a sua colaboração.
          Por isso não se acanhe, partilhe connosco as suas ideias, opiniões e
          constatações é a única forma de garantirmos que as coisas corram bem.
        </p>
      </div>
    </div>
  );
}

export default Feedbacks;
