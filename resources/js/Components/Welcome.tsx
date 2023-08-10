import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { GiDiscGolfBag, GiMusicalNotes } from 'react-icons/gi';
import { BsArrowRight, BsHeadphones } from 'react-icons/bs';
import { BiDisc } from 'react-icons/bi';
import { GrMultimedia } from 'react-icons/gr';

export default function Welcome() {
  return (
    <div>
      <div className="p-6 lg:p-8 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        {/*}
        <ApplicationLogo className="block h-12 w-auto" />
{*/}
        <h1 className="mt-8 text-2xl font-medium text-gray-900 dark:text-white">
          <strong>BEM VINDO AO UNIVERSO DAS EMOÇÕES MUSICAIS!</strong>
        </h1>

        <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
          <b>Lifter</b> é uma Revista Musical Digital que tem como objectivo
          descobrir talentos musicais e os expor aos amantes da música. Encpntre
          nos Tops Lifter as melhores musicas, as mais ouvidas, descubra as
          sensações da actualidade. Lifter é um ecossistema que oferece
          oportunidade para músicos iniciantes, profissionais da música e até
          para ouvintes.
          <br />
          <strong>Lifter</strong> foi desenvolvido para músicos, ouvintes,
          profissionais da música e promotores.
        </p>
      </div>

      <div className="bg-gray-200  dark:bg-gray-800 bg-opacity-25 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
        <div>
          <div className="flex items-center">
            <GiMusicalNotes size={45} />
            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              <a href="https://laravel.com/docs">Músicos</a>
            </h2>
          </div>

          <p className="mt-4 dark:text-gray-400 text-sm leading-relaxed">
            A Lifter traz para os músicos a oportunidade de promoverem e
            divulgarem as suas músicas através da inclusão nos Tops Lifter,
            esses tops são assinados por diferentes entidades do mercado musical
            nacional. E estes intervenientes veêm a Lifter a busca de talentos.
          </p>

          <p className="mt-4 text-base">
            <a
              href=""
              className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-300"
            >
              Explorar todas as oportunidades
              <BsArrowRight className="ml-2" />
            </a>
          </p>
        </div>

        <div>
          <div className="flex items-center">
            <BsHeadphones size={45} />
            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              <a href="">Ouvintes</a>
            </h2>
          </div>

          <p className="mt-4 dark:text-gray-400 text-sm leading-relaxed">
            Lifter permite aos ouvintes disfrutarem e descobrir milhões de
            músicas em todo o mundo. Dá-lhes ainda a oportunidade de receber
            gratificações variadas (dinheiro, concertos, convites, etc.) dados
            aos artistas por simplesmente ouvir, opinar e compartlhar as músicas
            que amam.
          </p>

          <p className="mt-4 text-sm">
            <a
              href=""
              className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-300"
            >
              Explorar todas as oportunidades
              <BsArrowRight className="ml-2" />
            </a>
          </p>
        </div>

        <div>
          <div className="flex items-center">
            <BiDisc size={45} />
            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              <a href="">Produtores & DJs</a>
            </h2>
          </div>

          <p className="mt-4 dark:text-gray-400 text-sm leading-relaxed">
            Lifter visa ser o meio primordial de disponibilização musical,
            permite que os produtores liberem directamente suas músicas na
            plataforma e as deixem disponíveis para descoberta do público. Por
            outro lado, os DJs podem utilizar Lifter para organizar suas músicas
            favoritas e acompanhas as tendências que certamente o público pede
            nos eventos que tocam. Produtores e DJs também são os jurados do
            concursos de ascensão promovido pela Lifter.
          </p>

          <p className="mt-4 text-sm">
            <a
              href=""
              className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-300"
            >
              Explorar todas as oportunidades
              <BsArrowRight className="ml-2" />
            </a>
          </p>
        </div>

        <div>
          <div className="flex items-center">
            <GrMultimedia size={45} />
            <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              Promotores & Influencers
            </h2>
          </div>

          <p className="mt-4 dark:text-gray-400 text-sm leading-relaxed">
            Lifter visa grupar todos os promotores musicais de modos que estes
            veiculem os grandes talentos que chegam em seu radar. Os promotore
            são também parte da comunidade de jurados da comunidade Lifter.
          </p>

          <p className="mt-4 text-sm">
            <a
              href=""
              className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-300"
            >
              Explorar todas as oportunidades
              <BsArrowRight className="ml-2" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
