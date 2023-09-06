import route from 'ziggy-js';
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineStar,
  HiOutlineVideoCamera,
  HiOutlineMusicNote,
  HiOutlineMicrophone,
  HiOutlineEmojiHappy,
  HiOutlineNewspaper,
  HiFire,
  HiArrowUp,
  HiArrowDown,
  HiOutlineUpload,
} from 'react-icons/hi';
import {
  FaCcDiscover,
  FaCog,
  FaCoins,
  FaHandshake,
  FaUserCircle,
  FaUserCog,
  FaUserSecret,
  FaVoteYea,
} from 'react-icons/fa';
import {
  MdContacts,
  MdEmojiEvents,
  MdExplore,
  MdLibraryMusic,
  MdMessage,
  MdNotifications,
  MdOutlineExplore,
} from 'react-icons/md';
import {
  GiClassicalKnowledge,
  GiDiscussion,
  GiEmptyChessboard,
  GiIcePop,
  GiRank1,
  GiRank2,
  GiTeacher,
  GiTrophyCup,
} from 'react-icons/gi';
import {
  BsCameraVideo,
  BsEmojiHeartEyes,
  BsFacebook,
  BsInfoCircle,
  BsInstagram,
  BsIntersect,
  BsListCheck,
  BsMusicNote,
  BsStars,
  BsTiktok,
  BsTrophy,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import {
  BiArrowFromBottom,
  BiArrowFromTop,
  BiCamera,
  BiHome,
  BiLibrary,
  BiLike,
  BiMicrophone,
  BiMusic,
  BiQuestionMark,
  BiTrendingUp,
  BiUserVoice,
  BiVideo,
} from 'react-icons/bi';
import {
  RiCompassDiscoverFill,
  RiContactsBook2Fill,
  RiProfileLine,
  RiStarSLine,
  RiTeamLine,
} from 'react-icons/ri';
import {
  GrGrow,
  GrIntegration,
  GrLike,
  GrMoney,
  GrWaypoint,
} from 'react-icons/gr';
import React from 'react';
import DadosPerfil from '@/Pages/Profile/Artist/DadosPerfil';

/**
 * PAGINAS E LINKS DO CONCURSO ASCENSÃO
 */
import {
  Sobre,
  Inscricoes,
  ArtistasInscritos,
  Beneficios,
  TermosCondicoes,
} from '@/Pages/Ascensao';
export const ascensao_links = [
  { name: 'Sobre', href: 'sobre', icon: BsInfoCircle, pagina: <Sobre /> },
  {
    name: 'Inscritos',
    href: 'artistas',
    icon: BiUserVoice,
    pagina: <ArtistasInscritos />,
  },
  {
    name: 'Inscrições',
    href: 'inscricoes',
    icon: BiMicrophone,
    pagina: <Inscricoes />,
  },
  {
    name: 'Benefícios',
    href: 'beneficios',
    icon: BsTrophy,
    pagina: <Beneficios />,
  },
  {
    name: 'Termos & Condições',
    href: 'termos_condicoes',
    icon: FaHandshake,
    pagina: <TermosCondicoes />,
  },
];

const RankingIcon = () => {
  return (
    <>
      <div className="flex flex-row -space-x-1 mr-2">
        <HiArrowUp className="m-0 text-[#4c88c4] " />
        <HiArrowDown className="m-0 text-red-600" />
      </div>
    </>
  );
};

/**
 * PAGINAS DE COMUNICAÇÕES: MENSAGENS E NOTIFICAÇÕES
 */
import { Notificacoes, Mensagens } from '@/Pages/Comunicar/Index';
export const comunicaoes_links = [
  {
    name: 'Notificações',
    href: 'notificacoes',
    icon: MdNotifications,
    pagina: <Notificacoes />,
  },
  {
    name: 'Mensagens',
    href: 'mensagens',
    icon: MdMessage,
    pagina: <Mensagens />,
  },
];

/**
 * Home Links and Pages for Beta version
 */

import { Posts, Destaques, Concursos, Lifter } from '@/Pages/Home';
export const home_pages = [
  { name: 'Destaques', href: 'destaques', icon: HiFire, pagina: <Destaques /> },
  { name: 'Home', href: 'Home', icon: BiHome, pagina: <Posts /> },
  //{ name: 'Tendências', href: 'tendencias', icon: BiTrendingUp },
  {
    name: 'Concursos',
    href: 'concursos',
    icon: GiTrophyCup,
    pagina: <Concursos />,
  },
  { name: 'Lifter', href: 'sobre', icon: RiTeamLine, pagina: <Lifter /> },
];

/**
 * PAGINSA E LINKS DE MÚSICAS
 */
import { Avaliar, Ranking, Descobrir, Artistas } from '@/Pages/Musicas';
export const music_pages = [
  { name: 'Avaliar', href: 'avaliar', icon: BiLike, pagina: <Avaliar /> },
  { name: 'Ranking', href: 'ranking', icon: RankingIcon, pagina: <Ranking /> },
  {
    name: 'Descobrir',
    href: 'descobrir',
    icon: MdExplore,
    pagina: <Descobrir />,
  },
  /*{ name: 'Músicas', href: 'musicas', icon: BsMusicNote },
  { name: 'Vídeos', href: 'videos', icon: BsCameraVideo },
  */ {
    name: 'Artistas',
    href: 'artistas',
    icon: BiUserVoice,
    pagina: <Artistas />,
  },
];

/**
 * PAGINAS DO PERFIL
 */
import {
  Perfil,
  Contactos,
  GerirArtista,
  Carregamentos,
  Biblioteca,
} from '@/Pages/Perfil';
export const account_pages = [
  {
    name: 'Perfil',
    href: 'perfil',
    icon: RiProfileLine,
    pagina: <Perfil />,
  },
  {
    name: 'Contactos',
    href: 'contactos',
    icon: RiContactsBook2Fill,
    pagina: <Contactos />,
  },
  //{ name: 'Integrações', href: 'integracoes', icon: BsIntersect },
  //{ name: 'Carteira Lifter', href: 'carteira', icon: FaCoins },
  //{ name: 'Sugestões', href: 'sugestoes', icon: BsInstagram },
  {
    name: 'Gestão artística',
    href: 'artistas',
    icon: BiUserVoice,
    pagina: <GerirArtista />,
  },
  {
    name: 'Carregamentos',
    href: 'uploads',
    icon: HiOutlineUpload,
    pagina: <Carregamentos />,
  },
  {
    name: 'Biblioteca pessoal',
    href: 'biblioteca',
    icon: BiLibrary,
    pagina: <Biblioteca />,
  },
];

/**
 * { name: 'Chats', href: route('chats'), icon: MdNotifications },
 */
export const zela_orange = '#d17734';
export const zela_green = '#6ba976';
export const zela_blue = '#4c88c4';
export const zela_bg_green = '#377377';
