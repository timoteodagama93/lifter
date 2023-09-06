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
          <div>
            <h1 className="text-4xl">O que é LIFTER?</h1>
            <p className="">
              Lifter đe uma plataforma de avaliačžao, sugestžao e classificačžao
              musical. A Lifter permite que seja o pđublico a criar e a promover
              as tendŽencias que possam se manter no mercado.
            </p>
            <p>
              Lifter đe um ponto de entrada para novas mđusicas e uma ponte que
              liga os mđusicos Đa audiŽencia, somos uma comunidade engajada em
              promover boa mđusica, partilhar emočžoes atravđes dela.
            </p>
          </div>
          <div>
            <h1 className="text-4xl">Quem faz a comunidade?</h1>
            <p className="">
              A comunidade Lifter đe feita do pđublico amante de mđusicos, de
              artistas e de profissionais do sector musical. Todos aqueles que
              vivenciam emočžoes atravđes da mđusica sžao sempre bem-vindos.{' '}
            </p>
            <p>
              Lifter đe um ponto de entrada para novas mđusicas e uma ponte que
              liga os mđusicos Đa audiŽencia, somos uma comunidade engajada em
              promover boa mđusica, partilhar emočžoes atravđes dela.
            </p>
          </div>
        </div>
      )}
      {show === 'join' && (
        <div className="flex">
          <div>
            <h1 className="text-4xl">Vagas</h1>
            <p className="">
              Você pode juntar-se a equipa Lifter candidatando-se às vagas em
              aberto.
            </p>
          </div>
          <div>
            <h1 className="text-4xl">Outras formas</h1>
            <p className="">
              Caso queira juntar-se de outra forma ou através de um projecto em
              mente, sinta-se livre em enviar um e-mail para{' '}
              <strong>join@lifter.net</strong> para a nossa equipa detalhando o
              projecto.
            </p>
          </div>
        </div>
      )}
      {show === 'vagas' && (
        <div className="flex flex-col p-2 spce-y-5">
          <div>
            <h1 className="text-4xl">Gestor de Marketing e vendas</h1>
            <p className="">
              Procuramos por um profissional no sector de Marketing e vendas.
              Possuir experiência em Marketing Musical e/ou Digital pode ser um
              diferencial.
            </p>
          </div>
          <div>
            <h1 className="text-4xl">Programador</h1>
            <p className="">
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
