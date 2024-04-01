import SelectGenre from '@/Components/SelectGenre';
import AppLayout from '@/Layouts/AppLayout';
import React, { useState, useEffect } from 'react';
import { BiConversation, BiDotsHorizontal, BiSearch } from 'react-icons/bi';
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdCall, MdFeedback, MdNotifications } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ChatItemList from '@/Components/ChatItemList';
import ConversationReader from '@/Components/ConversationReader';
import { Notificacoes } from './Index';
import SectionBorder from '@/Components/SectionBorder';
import { GrNotification } from 'react-icons/gr';
import Feedbacks from './Feedbacks';
import Swal from 'sweetalert2';
import PlayerContainer from '@/Layouts/PlayerContainer';
import PlayerLayout from '@/Layouts/PlayerLayout';
//import Swal from 'sweetalert2'
function Mensagens() {
  const [activar, setActivar] = useState('musicas');
  const { currentPage, setCurrentPage } = useStateContext();
  const { setHideSider } = useStateContext();

  const loadDefaultPage = () => {
    setCurrentPage(<Feedbacks />);
  };
  useEffect(loadDefaultPage, []);

  const [swalProps, setSwalProps] = useState({});

  return (
    <PlayerLayout title="Comunicações">
      <PlayerContainer>
        <div className="w-full h-full">
          <div className="w-full mt-4 flex flex-row justify-center items-center gap-1 md:gap-5">
            <button
              onClick={() => setCurrentPage(<Feedbacks />)}
              className="justify-center items-center flex p-2 gap-1 text-base md:text-xl shadow shadow-[#4c88c4] "
            >
              <MdFeedback /> Feedback
            </button>
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Funcionalidade em desenvolvimento!',
                  text: 'A brevemente. Acompanhe as novidades e o cronograma de lançamentos.',
                  icon: 'info',
                  confirmButtonText: 'Legal',
                });
              }}
              className="justify-center items-center flex p-2 gap-1 text-base md:text-xl shadow shadow-[#4c88c4] "
            >
              <MdNotifications /> Notificações
            </button>
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Funcionalidade em desenvolvimento!',
                  text: 'A troca de mensagens estará disponível brevemente. Acompanhe as novidades e o cronograma de lançamentos.',
                  icon: 'info',
                  confirmButtonText: 'Legal',
                });
              }}
              className="justify-center items-center flex p-2 gap-1 text-base md:text-xl shadow shadow-[#4c88c4]"
            >
              <BiConversation /> Mensagens
            </button>
          </div>
          <SectionBorder />
          <div className="w-full">{currentPage}</div>
        </div>
      </PlayerContainer>
    </PlayerLayout>
  );
}

export default Mensagens;
