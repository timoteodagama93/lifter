import AppLayout from '@/Layouts/AppLayout';
import React, { useRef, useState } from 'react';
import { songs } from '../../../data/dummy';
import {
  BiEdit,
  BiMusic,
  BiPhotoAlbum,
  BiSend,
  BiStats,
  BiUpload,
  BiUserVoice,
} from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti';
import Modal from '@/Components/Modal';
import { MdClose, MdOutlineAppRegistration } from 'react-icons/md';
import UserAvatar from '@/Components/UserAvatar';
import { Link, useForm } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import { router } from '@inertiajs/core';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Upload from '../Songs/Upload';
import SongUpload from '@/Components/SongUpload';
import route, { Router } from 'ziggy-js';
import axios from 'axios';
import RegisterArtist from '../Auth/RegisterArtist';
import AddArtist from '@/Components/AddArtist';
import SecondaryButton from '@/Components/SecondaryButton';
import TopArtists from '@/Components/TopArtists';
import SectionBorder from '@/Components/SectionBorder';
import MyArtists from '@/Components/MyArtists';
import PlayPause from '@/Components/PlayPause';
import { BsEye } from 'react-icons/bs';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import useRoute from '@/Hooks/useRoute';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AddArtistCover from '@/Components/AddArtistCover';

function Musico() {
  const page = useTypedPage();
  const { currentPage } = useStateContext();
  const [registroArtistico, setRegistroArtistico] = useState(false);
  const [upLoadingSong, setUpLoadingSong] = useState(false);
  const [render, setRender] = useState(<DadosPerfil page={page} />);
  const [myArtists, setMyArtists] = useState([]);

  return (
    <AppLayout title="Perfil">
      <div className="w-full h-full">
        {currentPage == '' && <DadosPerfil page={page} />}
        {currentPage == 'perfil' && <DadosPerfil page={page} />}
        {currentPage == 'contactos' && <Contactos page={page} />}
        {currentPage == 'artistas' && (
          <GerirArtista artists={myArtists} page={page} />
        )}
        {currentPage == 'uploads' && <DadosPerfil page={page} />}
        {currentPage == 'biblioteca' && <DadosPerfil page={page} />}
      </div>
    </AppLayout>
  );
}

export default Musico;

function DadosPerfil({ page }) {

}


