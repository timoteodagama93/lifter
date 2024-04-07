import {
  HiFire,
  HiArrowUp,
  HiArrowDown,
  HiOutlineUpload,
  HiUserGroup,
} from 'react-icons/hi';
import { FaArtstation, FaHandshake } from 'react-icons/fa';
import {
  MdBusinessCenter,
  MdEvent,
  MdExplore,
  MdLiveTv,
  MdMessage,
  MdNotifications,
  MdOutlineExplore,
  MdOutlineShortcut,
} from 'react-icons/md';
import { GiSoundWaves, GiTrophyCup } from 'react-icons/gi';
import { BsInfoCircle, BsStars, BsTools, BsTrophy } from 'react-icons/bs';
import {
  BiDisc,
  BiHome,
  BiLibrary,
  BiMicrophone,
  BiMusic,
  BiUpload,
  BiUserVoice,
  BiVideo,
} from 'react-icons/bi';
import {
  RiContactsBook2Fill,
  RiProfileLine,
  RiTeamLine,
  RiUserStarFill,
} from 'react-icons/ri';
import React from 'react';

/**
 * PAGINAS E LINKS DO CONCURSO ASCENSÃO
 */
export const ascensao_links = [
  { name: 'Sobre', href: 'sobre', icon: BsInfoCircle },
  {
    name: 'Inscritos',
    href: 'artistas',
    icon: BiUserVoice,
  },
  {
    name: 'Inscrições',
    href: 'inscricoes',
    icon: BiMicrophone,
  },
  {
    name: 'Benefícios',
    href: 'beneficios',
    icon: BsTrophy,
  },
  {
    name: 'Termos & Condições',
    href: 'termos_condicoes',
    icon: FaHandshake,
  },
];

const RankingIcon = () => {
  return (
    <>
      <div className="flex flex-row italic mr-2">
        <HiArrowUp className="-m-1 text-xl italic text-[#4c88c4] " />
        <HiArrowDown className="-m-1 text-xl italic text-red-600" />
      </div>
    </>
  );
};

/**
 * PAGINAS DE COMUNICAÇÕES: MENSAGENS E NOTIFICAÇÕES
 */
export const comunicaoes_links = [
  {
    name: 'Notificações',
    href: 'notificacoes',
    icon: MdNotifications,
  },
  {
    name: 'Mensagens',
    href: 'mensagens',
    icon: MdMessage,
  },
];

/**
 * Home Links and Pages for Beta version
 */

export const home_pages = [
  { name: 'Destaques', href: 'destaques', icon: HiFire },
  { name: 'Home', href: 'Home', icon: BiHome },
  //{ name: 'Tendências', href: 'tendencias', icon: BiTrendingUp },
  {
    name: 'Concursos',
    href: 'concursos',
    icon: GiTrophyCup,
  },
  { name: 'Lifter', href: 'sobre', icon: RiTeamLine },
];

/**
 * PAGINSA E LINKS DE MÚSICAS
 */
export const music_pages = [
  //{ name: 'Avaliar', href: 'avaliar', icon: BiLike, pagina: <Avaliar /> },
  { name: 'Ranking', href: 'ranking', icon: RankingIcon },
  {
    name: 'Descobrir',
    href: 'descobrir',
    icon: MdExplore,
  },
  /*{ name: 'Músicas', href: 'musicas', icon: BsMusicNote },
  { name: 'Vídeos', href: 'videos', icon: BsCameraVideo },
  */ {
    name: 'Artistas',
    href: 'artistas',
    icon: BiUserVoice,
  },
];

export const account_pages = [
  {
    name: 'Perfil usuario',
    href: 'usuario',
    icon: RiProfileLine,
  },
  {
    name: 'Perfil artista',
    href: 'artista',
    icon: RiProfileLine,
  },
  {
    name: 'Contactos',
    href: 'contactos',
    icon: RiContactsBook2Fill,
  },
  //{ name: 'Integrações', href: 'integracoes', icon: BsIntersect },
  //{ name: 'Carteira Lifter', href: 'carteira', icon: FaCoins },
  //{ name: 'Sugestões', href: 'sugestoes', icon: BsInstagram },
  {
    name: 'Publicações',
    href: 'publicacoes',
    icon: HiOutlineUpload,
  },
  {
    name: 'Biblioteca pessoal',
    href: 'biblioteca',
    icon: BiLibrary,
  },
];

export const artist_pages = [
  {
    name: 'Perfil Padrão',
    href: 'perfil',
    icon: RiProfileLine,
  },
  {
    name: 'Músicas',
    href: 'musicas',
    icon: RiContactsBook2Fill,
  },
  {
    name: 'Meus aartístas',
    href: 'artistas',
    icon: BiUserVoice,
  },
];
export const links = [
  {
    name: 'Home',
    href: '/',
    icon: BiHome,
  },

  {
    name: 'Liver TV',
    href: '/livertv',
    icon: MdLiveTv,
  },
  {
    name: 'Eventos',
    href: '/eventos',
    icon: MdEvent,
  },
  {
    name: 'Ranking',
    href: '/ranking',
    icon: RankingIcon,
  },
  {
    name: 'Artistas',
    href: '/artistas',
    icon: RiUserStarFill,
  },
  {
    name: 'Produtoras',
    href: '/produtoras',
    icon: GiSoundWaves,
  },
  {
    name: 'DJs',
    href: '/djs',
    icon: BiDisc,
  },
  {
    name: 'Comunidade',
    href: '/comunidade',
    icon: HiUserGroup,
  },
  {
    name: 'Descobrir',
    href: '/discover',
    icon: MdOutlineExplore,
  },
  {
    name: 'Serviços',
    href: '/services',
    icon: MdBusinessCenter,
  },

  /*{
    name: 'Configurações',
    href: '/configuracoes',
    icon: FaCog,
  },
  {
    name: 'Políticas',
    href: '/politicas',
    icon: FaHandshake,
  },
  */
  /**
  {
    name: 'Imediações',
    href: '/imediacoes',
    icon: HiOutlinePhotograph,
  },
  {
    name: 'Top artistas',
    href: '/top-artists',
    icon: HiUserGroup,
  },
  {
    name: 'Top Charts',
    href: '/top-charts',
    icon: HiOutlineHashtag,
  },
  {
    name: 'Vídeos',
    href: '/videos',
    icon: HiOutlineVideoCamera,
  }, */
];
export const mainLinks = [
  {
    name: 'Home',
    href: '/home',
    icon: BiHome,
  },

  {
    name: 'Atalhos',
    href: '/shortcuts',
    icon: MdOutlineShortcut,
  },
  {
    name: 'Avaliações',
    href: '/avaliacoes',
    icon: BsStars,
  },
  {
    name: 'Músicas',
    href: '/musicas',
    icon: BiMusic,
  },
  {
    name: 'Videos',
    href: '/video',
    icon: BiVideo,
  },
  {
    name: 'Voz Activa',
    href: '/vozactiva',
    icon: GiSoundWaves,
  },
  {
    name: 'Concursos',
    href: '/concursos',
    icon: BsTrophy,
  },
  {
    name: '+Artes',
    href: '/arts',
    icon: FaArtstation,
  },

  /*{
    name: 'Configurações',
    href: '/configuracoes',
    icon: FaCog,
  },
  {
    name: 'Políticas',
    href: '/politicas',
    icon: FaHandshake,
  },
  */
  /**
  {
    name: 'Imediações',
    href: '/imediacoes',
    icon: HiOutlinePhotograph,
  },
  {
    name: 'Top artistas',
    href: '/top-artists',
    icon: HiUserGroup,
  },
  {
    name: 'Top Charts',
    href: '/top-charts',
    icon: HiOutlineHashtag,
  },
  {
    name: 'Vídeos',
    href: '/videos',
    icon: HiOutlineVideoCamera,
  }, */
];

/**
 * { name: 'Chats', href: route('chats'), icon: MdNotifications },
 */
export const zela_orange = '#d17734';
export const zela_green = '#6ba976';
export const zela_blue = '#4c88c4';
export const zela_bg_green = '#377377';

export const generos = [
  { title: 'Kuduro', value: 'KUDURO' },
  { title: 'Zouk', value: 'Zouk' },
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP' },
  { title: 'Semba', value: 'SEMBA' },
  { title: 'Kizomba', value: 'KIZOMBA' },
  { title: 'Naija', value: 'NAIJA' },
  { title: 'Gospel', value: 'GOSPEL' },
  { title: 'Afro-House', value: 'AFRO_HOUSE' },
  { title: 'Samba', value: 'SAMBA' },
  { title: 'Funk', value: 'FUNK' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Rebita', value: 'Rebita' },
  { title: 'RnB', value: 'RNB' },
  { title: 'RAP', value: 'RAP' },
];
