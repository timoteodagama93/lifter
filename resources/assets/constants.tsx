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
} from 'react-icons/hi';
import { FaCcDiscover, FaHandshake, FaUserCircle, FaUserCog, FaUserSecret, FaVoteYea } from 'react-icons/fa';
import { MdContacts, MdEmojiEvents, MdExplore, MdLibraryMusic, MdNotifications, MdOutlineExplore } from 'react-icons/md';
import { GiClassicalKnowledge, GiIcePop, GiRank1, GiRank2, GiTeacher } from 'react-icons/gi';
import { BsEmojiHeartEyes, BsFacebook, BsInfoCircle, BsInstagram, BsStars, BsTiktok, BsTrophy, BsTwitter, BsYoutube } from 'react-icons/bs';
import { BiArrowFromBottom, BiArrowFromTop, BiCamera, BiLibrary, BiLike, BiMicrophone, BiMusic, BiTrendingUp, BiVideo } from 'react-icons/bi';
import { RiCompassDiscoverFill, RiContactsBook2Fill, RiProfileLine, RiStarSLine } from 'react-icons/ri';
import { GrGrow, GrIntegration, GrMoney, GrWaypoint } from 'react-icons/gr';
import React from 'react';

export const upper_links = [
  { name: 'Inicio', href: route('inicio'), icon: HiOutlineHome },
  { name: 'Músicas', href: route('musicas'), icon: BiMusic },
  { name: 'Ascensão', href: route('ascensao'), icon: MdEmojiEvents },
 // { name: 'Bibliotecas', href: route('bibliotecas'), icon: MdLibraryMusic },
  //{ name: 'Notícias', href: route('noticias'), icon: HiOutlineNewspaper },
  { name: 'Explorar', href: route('explorar'), icon: MdOutlineExplore },
];
export const ascensao_links = [
  { name: 'Sobre', href: 'sobre', icon: BsInfoCircle },
  { name: 'Artistas', href: 'artistas', icon: BiArrowFromBottom },
  { name: 'Inscrições', href: 'inscricoes', icon: BiMicrophone },
  { name: 'Benefícios', href: 'beneficios', icon: BsTrophy },
  { name: 'Termos & Condições', href: 'termos_condicoes', icon: FaHandshake },
];

const RankingIcon = ()=>{
  return(
    <>
    <div className='flex flex-row -space-x-1 mr-2'>
      <HiArrowUp className='m-0 text-[#4c88c4] '  />
      <HiArrowDown className='m-0 text-red-600' />
    </div>
    </>
  )
  }

/**
 * Home Links for Beta version
 */
export const home_links = [
  { name: 'Destaques', href: 'destaques', icon: HiFire },
  { name: 'Famosos', href: 'famosos', icon: FaUserSecret },
  { name: 'Dicas', href: 'dicas', icon:  GiTeacher},
  ];

/**
 * Home Links for Beta version
 */
export const music_links = [
  { name: 'Avaliar', href: 'avaliar', icon: FaVoteYea },
  { name: 'Ranking', href: 'ranking', icon:  RankingIcon},
  { name: 'Descobrir', href: 'descobrir', icon: MdExplore },
];



/*
REAL HOME ITENS
export const home_links = [
  { name: 'Avaliar', href: 'avaliar', icon: HiOutlineEmojiHappy },
  { name: 'Ranking', href: 'rank', icon: HiFire },
  { name: 'Descobrir', href: 'descobrir', icon: MdExplore },
  { name: 'Tendências', href: 'tendencias', icon: BiTrendingUp },//Colocado em descobrir
  { name: 'Sugestões', href: 'sugestoes', icon: GrWaypoint }, //Colocado em descobrir
];
*/
export const bibliotecas_links = [
  { name: 'Músicas', href: 'musicas', icon: HiOutlineEmojiHappy },
  { name: 'Vídeos', href: 'videos', icon: BiVideo },
  { name: 'Talentos', href: 'talentos', icon: BiMicrophone },
  { name: 'Ascensão', href: 'ascensao', icon: BsStars },
];

export const news_links = [
  { name: 'Famosos', href: 'rank', icon: RiStarSLine },
  { name: 'Destaques', href: 'avaliar', icon: HiOutlineEmojiHappy },
  { name: 'Lançamentos', href: 'talentos', icon: BiMicrophone },
  { name: 'Inspirações', href: 'estrelas', icon: BsStars },
];

export const explore_links = [
  { name: 'Twitter', href: 'twitter', icon: BsTwitter },
  { name: 'Youtube', href: 'youtube', icon: BsYoutube },
  { name: 'Tik Tok', href: 'tiktok', icon: BsTiktok },
  { name: 'Facebook', href: 'facebook', icon: BsFacebook },
  { name: 'Instagram', href: 'instagram', icon: BsInstagram },
];

export const account_links = [
  { name: 'Perfil', href: 'twitter', icon: RiProfileLine },
  { name: 'Contactos', href: 'youtube', icon: RiContactsBook2Fill },
  { name: 'Integrações', href: 'tiktok', icon: GrIntegration },
  { name: 'Crédito Lifter', href: 'facebook', icon: GrMoney },
  { name: 'Sugestões', href: 'instagram', icon: BsInstagram },
  { name: 'Biblioteca pessoal', href: 'instagram', icon: BiLibrary },
];

export const links = [
  { name: 'Descobrir', href: route('inicio'), icon: HiOutlineHome },
  { name: 'Ascensão', href: route('conta'), icon: MdEmojiEvents },
  { name: 'Avaliar', href: route('ascensao'), icon: HiOutlineEmojiHappy },
  { name: 'Artistas', href: route('conta'), icon: HiOutlineMicrophone },
  { name: 'Estrelas', href: route('conta'), icon: BsStars },
];

/**
 *
 *
 * { name: 'Descobrir', href: route('descobrir'), icon: HiOutlineHashtag },
 * { name: 'Músicas', href: route('musicas'), icon: HiOutlineMusicNote },
 * { name: 'Vídeos', href: route('videos'), icon: HiOutlineVideoCamera },
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
export const user_links = [
  { name: 'Conta', href: route('conta'), icon: FaUserCircle },
];

/**
 * { name: 'Chats', href: route('chats'), icon: MdNotifications },
 */
export const zela_orange = '#d17734';
export const zela_green = '#6ba976';
export const zela_blue = '#4c88c4';
export const zela_bg_green = '#377377';
