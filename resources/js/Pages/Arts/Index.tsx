import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';

import { useStateContext } from '@/contexts/PaginaActualContext';
import RankingIcon from '@/Components/RankingIcon';
import {
  MdEmojiSymbols,
  MdExplore,
  MdGroups,
  MdOutlineMotionPhotosOn,
} from 'react-icons/md';
import { BsCameraVideo, BsNewspaper } from 'react-icons/bs';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { FaDirections, FaPray } from 'react-icons/fa';
import {
  BiBible,
  BiBook,
  BiBookOpen,
  BiBookmarks,
  BiBrush,
  BiDownload,
  BiLibrary,
  BiPaint,
} from 'react-icons/bi';
import {
  GiCrimeSceneTape,
  GiLoveSong,
  GiSing,
  GiTeacher,
} from 'react-icons/gi';
import Dance from './Dance';
import Arts from './Arts';
import Exposicoes from './Exposicoes';
import Estante from './Estante';
import BibliotecaLiteraria from './BibliotecaLiteraria';
import PlayerLayout from '@/Layouts/PlayerLayout';
import PlayerContainer from '@/Layouts/PlayerContainer';

export default function Index({ has }) {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();

  useEffect(() => {
    if (has && has == 'expositions') {
      setCurrentPage(<Exposicoes />);
    }
    if (has == 'estante') {
      alert(has);
      setCurrentPage(<BibliotecaLiteraria />);
    }
    if (!has) {
      setCurrentPage(<Arts />);
    }
  }, []);
  return (
    <PlayerLayout title="Artes">
      <PlayerContainer>
        <div className="w-full ">{currentPage}</div>
      </PlayerContainer>
    </PlayerLayout>
  );
}
