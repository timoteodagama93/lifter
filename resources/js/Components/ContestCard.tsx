import React from 'react';
import { Link } from '@inertiajs/react';
import './contestCard.css';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ContestDetails from './Contest/ContestDetails';
import Swal from 'sweetalert2';
interface Props {
  concurso: Object;
}
function ContestCard({ concurso }: Props) {
  const { setCurrentPage } = useStateContext();
  return (
    <div className="relative w-full lg:w-1/2 h-full lg:h-1/2 product  ">
      <div className="relative imgbox">
        <img src={concurso.url_cover} alt="" className=" h-auto" />
        <div className="shadow shadow-black  rounded text-base absolute top-0 left-5 animate-bounce_ bg-[#fff]  p-1 text-[#ff4f2f] text-bold ">
          <span className="text-xs">Prémio KZ</span> {concurso.total_premios}
        </div>
      </div>
      <div className="details ">
        <div className="identity justify-center items-center">
          <div className="text-base md:text-xl"> {concurso.designacao} </div>
        </div>

        <label htmlFor="">Cache</label>
        <ul>
          <li>1º: {concurso.lugar_1} KZ</li>
          <li>2º: {concurso.lugar_2} KZ</li>
          <li>3º: {concurso.lugar_3} KZ</li>
        </ul>
        <label htmlFor="">Marketing</label>
        <ul>
          <li> {concurso.premios_extras} </li>
        </ul>

        <Link
          href={`/contest-details/${concurso.id}`}
          className="link-btn active:animate-ping  "
        >
          Inscrever-se
        </Link>
      </div>
    </div>
  );
}

export default ContestCard;
