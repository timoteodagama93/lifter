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

export const ascensao_links = [
  { name: 'Sobre', href: 'sobre', icon: BsInfoCircle },
  { name: 'Inscritos', href: 'artistas', icon: BiUserVoice },
  { name: 'Inscrições', href: 'inscricoes', icon: BiMicrophone },
  { name: 'Benefícios', href: 'beneficios', icon: BsTrophy },
  { name: 'Termos & Condições', href: 'termos_condicoes', icon: FaHandshake },
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
 * Home Links for Beta version
 */
export const comunicaoes_links = [
  { name: 'Notificações', href: 'notificacoes', icon: MdNotifications },
  { name: 'Mensagens', href: 'mensagens', icon: MdMessage },
];

/**
 * Home Links for Beta version
 */
export const jurados_links = [
  { name: 'Destaques', href: 'destaques', icon: HiFire },
  { name: 'Avaliar', href: 'avaliar', icon: RankingIcon },
  { name: 'Opinar', href: 'opinar', icon: GiDiscussion },
  /**
   * Vídeos Links for Beta version
   */
];


/**
 * Home Links for Beta version
 */

export const home_links = [
  { name: 'Início', href: 'inicio', icon: BiHome },
  { name: 'Destaques', href: 'destaques', icon: HiFire },
  { name: 'Tendências', href: 'tendencias', icon: BiTrendingUp }, //Colocado em descobrir
  { name: 'Concursos', href: 'concursos', icon: GiTrophyCup }, //Colocado em descobrir
  { name: 'Equipa Lifter', href: 'sobre', icon: RiTeamLine },
  ];

export const music_links = [
  { name: 'Avaliar', href: 'avaliar', icon: BiLike },
  { name: 'Ranking', href: 'ranking', icon: RankingIcon },
  { name: 'Descobrir', href: 'descobrir', icon: MdExplore },
  /*{ name: 'Músicas', href: 'musicas', icon: BsMusicNote },
  { name: 'Vídeos', href: 'videos', icon: BsCameraVideo },
  */{ name: 'Artistas', href: 'artistas', icon: BiUserVoice },
];

export const account_links = [
  { name: 'Perfil', href: 'perfil', icon: RiProfileLine },
  { name: 'Contactos', href: 'contactos', icon: RiContactsBook2Fill },
  { name: 'Integrações', href: 'integracoes', icon: BsIntersect },
  { name: 'Carteira Lifter', href: 'carteira', icon: FaCoins },
  { name: 'Sugestões', href: 'sugestoes', icon: BsInstagram },
  { name: 'Carregamentos', href: route('uploads'), icon: HiOutlineUpload },
  { name: 'Biblioteca pessoal', href: 'biblioteca_pessoal', icon: BiLibrary },
];

/**
 * { name: 'Chats', href: route('chats'), icon: MdNotifications },
 */
export const zela_orange = '#d17734';
export const zela_green = '#6ba976';
export const zela_blue = '#4c88c4';
export const zela_bg_green = '#377377';
