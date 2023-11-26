import React, { useState } from 'react';

function Lifter() {
  const [show, setShow] = useState('about');
  return (
    <div className="flex flex-col pb-10">
      <div className="w-full flex flex-row justify-center space-x-1">
        <button
          onClick={() => setShow('about')}
          className="text-base md:text-xl py-2 px-4 hover:bg-[#2e2c2e] hover:text-white border border-[#fff] rounded-lg "
        >
          Sobre
        </button>
        <button
          onClick={() => setShow('join')}
          className="text-base md:text-xl py-2 px-4 hover:bg-[#2e2c2e] hover:text-white border border-[#fff] rounded-lg "
        >
          Juntar-se
        </button>
        <button
          onClick={() => setShow('vagas')}
          className="text-base md:text-xl py-2 px-4 hover:bg-[#2e2c2e] hover:text-white border border-[#fff] rounded-lg "
        >
          Vagas abertas
        </button>
      </div>
      {show === 'about' && (
        <div className="flex">
          <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Mais sobre a Lifter.
            </h1>
            <p>
              Lifter đe uma plataforma de avaliação, sugestão e classificação
              musical. A Lifter permite que seja o público a criar e a promover
              as tendências que possam se manter no mercado.
            </p>
          </div>
          <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Quem faz a comunidade?
            </h1>
            <p>
              A comunidade Lifter đe feita do público amante de música, de
              artistas e de profissionais do sector musical. Todos aqueles que
              vivenciam emoções através da música sempre bem-vindos.{' '}
            </p>
          </div>

          <div>
            <h1 className="text-4xl"></h1>
            <p className=""></p>
          </div>
        </div>
      )}
      {show === 'join' && (
        <div className="flex">
          <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Vagas
            </h1>
            <p>
              Você pode juntar-se a equipa Lifter candidatando-se às vagas em
              aberto.
            </p>
          </div>
          <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Outras formas
            </h1>
            <p>
              Caso queira juntar-se de outra forma ou através de um projecto em
              mente, sinta-se livre em enviar um e-mail para{' '}
              <strong>contact@lifter.ao</strong> para a nossa equipa detalhando
              o projecto.
            </p>
          </div>
        </div>
      )}
      {show === 'vagas' && (
        <div className="flex flex-col p-2 spce-y-5">
          <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Gestor de Marketing e vendas
            </h1>
            <p>
              {' '}
              <strong>contact@lifter.ao</strong>{' '}
            </p>

              Procuramos por um profissional no sector de Marketing e vendas.
            <p>
              Possuir experiência em Marketing Musical e/ou Digital pode ser um
              diferencial.
            </p>
          </div>
          <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
              Programador
            </h1>
            <strong>contact@lifter.ao</strong>{' '}
            <p>
              Procuramos um desenvolvedor Web e/ou Mobile para integrar o nosso
              time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lifter;
