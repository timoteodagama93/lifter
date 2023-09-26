import React from 'react';

function Inscricoes() {
  return (
    <div className="justify-center">
      <h1 className="text-center text-3xl">Inscrever-se e participar</h1>

      <form className="m-0">
        <div className="border p-5 w-full flex flex-row mx-1 justify-start items-center">
          <label htmlFor="artistico" className=" mx-1 justify-end">
            Nome Completo
          </label>
          <input
            className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
            id="artistico"
            type="text"
          />
        </div>
        <div className="border shadow-sm p-5 w-full flex flex-row mx-1 justify-start items-center">
          <label htmlFor="artistico" className=" mx-1 justify-end">
            Nome artístico
          </label>
          <input
            className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
            id="artistico"
            type="text"
          />
        </div>
        <div className="border p-5 w-full flex flex-row mx-1 justify-start items-center">
          <label htmlFor="artistico" className=" mx-1 justify-end">
            Estilo Musical
          </label>
          <input
            className="w-full border-1 rounded-sm  shadow-sm"
            id="artistico"
            type="text"
          />
        </div>
        <div className="w-full m-5 flex justify-center items-center">
          <button
            type="button"
            className="w-auto border bg-orange-200 shadow-lg rounded m-1 p-5"
          >
            Pré isncrever-se
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inscricoes;
