import {
  HiFire,
  HiArrowUp,
  HiArrowDown,
  HiOutlineUpload,
  HiOutlinePhotograph,
  HiUserGroup,
  HiOutlineHashtag,
  HiOutlineVideoCamera,
} from 'react-icons/hi';
import { FaHandshake, FaNewspaper } from 'react-icons/fa';
import {
  MdExplore,
  MdMessage,
  MdNotifications,
  MdOutlineExplore,
} from 'react-icons/md';
import { GiTrophyCup } from 'react-icons/gi';
import { BsInfoCircle, BsTrophy } from 'react-icons/bs';
import { BiHome, BiLibrary, BiMicrophone, BiUserVoice } from 'react-icons/bi';
import { RiContactsBook2Fill, RiProfileLine, RiTeamLine } from 'react-icons/ri';
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
    name: 'Ranking',
    href: '/ranking',
    icon: RankingIcon,
  },
  {
    name: 'Ascensão',
    href: '/ascensao',
    icon: BsTrophy,
  },
  {
    name: 'Descobrir',
    href: '/discover',
    icon: MdOutlineExplore,
  },
  {
    name: 'Notícias',
    href: '/noticias',
    icon: FaNewspaper,
  },
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
