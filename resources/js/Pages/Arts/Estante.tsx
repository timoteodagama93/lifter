import { useStateContext } from '@/contexts/PaginaActualContext';
import React, { useState } from 'react';
import { BiArrowBack, BiBookOpen, BiBrush, BiUpload } from 'react-icons/bi';
import { BsCameraVideo, BsFilePdf } from 'react-icons/bs';
import { GiCrimeSceneTape } from 'react-icons/gi';
import {
  MdCloseFullscreen,
  MdOutlineCloseFullscreen,
  MdOutlineMotionPhotosOn,
} from 'react-icons/md';
import Dance from './Dance';
import ArtesMistas from './ArtesMistas';
import Modal from '@/Components/Modal';
import AddVideo from '../Videos/AddVideo';
import Arts from './Arts';
import AddExposicao from '@/Components/AddExposicao';
import {
  useGetEstanteBooksQuery,
  useGetExpositionItemsQuery,
  useGetExpositionsQuery,
} from '@/redux/services/coreApi';
import { Loader } from '@/Components';
import useTypedPage from '@/Hooks/useTypedPage';
import AddExpositionItem from '@/Components/AddExpositionItem';
import Interagir from '@/Components/Interagir';
import AddBook from '@/Components/AddBook';
import BibliotecaLiteraria from './BibliotecaLiteraria';
import DisplayContent from '@/Components/Editor/DisplayContent';
import PDFViewer from '@/Components/PDFViewer';

export default function Estante({ estante }) {
  const { setCurrentPage } = useStateContext();
  const page = useTypedPage();

  const [addObra, setAddObra] = useState(false);

  const {
    data: books,
    isFetching,
    error,
  } = useGetEstanteBooksQuery(estante.id);

  const [seeArtistDetails, setSeeArtistDetails] = useState(false);
  const [bookUrl, setBookUrl] = useState('');

  if (isFetching) return <Loader title="Carregando livros da estante" />;
  return (
    <>
      <Modal isOpen={addObra} onClose={() => setAddObra(false)}>
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
            <button
              onClick={() => setAddObra(false)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
            </button>
            <span>Adicionar livro à estante</span>
          </h1>
          <AddBook estante={estante} />
        </div>
      </Modal>
      <div className="w-full h-full relative flex flex-row rounded">
        <div className="w-full h-full flex flex-col px-4 rounded-lg">
          <div className="w-full h-full flex justify-between items-center p-1 md:px-5 border-b">
            <button
              onClick={() => setCurrentPage(<BibliotecaLiteraria />)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <BiArrowBack className="w-10 h-auto font-bold" />{' '}
            </button>
            <h1 className="text-center font-bold text-4xl">
              Estante de livros
            </h1>

            <div className="flex flex-row justify-center items-center gap-5">
              {page.props.auth.user?.id == estante.user_id && (
                <button
                  onClick={() => setAddObra(true)}
                  className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                >
                  <BiUpload className="w-10 h-auto font-bold" />{' '}
                  <span className="flex">Adicionar obra</span>
                </button>
              )}
            </div>
          </div>

          <div className="w-full flex gap-y-5 flex-wrap p-5 relative h-full justifiy-center items-center ">
            {books?.map(obra => (
              <>
                <div className="w-full my-4 p-2">
                  <div className="w-full h-full  flex flex-col relative justify-center item-center   shadow-black shadow-md p-5">
                    <div className="w-full h-full  flex flex-col relative justify-center item-center p-1 border  hover:cursor-pointer ">
                      <div className="w-full h-full flex justify-center items-center rigth-0">
                        {obra.html === 1 ? (
                          <div className="container mx-auto p-4">
                            <h1 className="text-xl mb-4"> {obra.title} </h1>
                            <div
                              className="bg-gray-100 p-4 rounded shadow"
                              dangerouslySetInnerHTML={{ __html: obra.resume }}
                            />
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setBookUrl(obra.book_url);
                                setSeeArtistDetails(true);
                              }}
                              className={`transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-row text-xl justify-center items-center mx-1 border-b-2 backdrop-blur-lg p-1 my-1 gap-1  `}
                            >
                              <BsFilePdf className="w-10 h-10" />
                              Ver PDF
                            </button>
                          </>
                        )}
                      </div>
                      <div className="w-full flex flex-col gap-0">
                        <Interagir collectionType="literatura" song={obra} />
                        <span className="border-t-2 relative text-2xl text-yellow-400 font-bold">
                          {obra?.title}
                        </span>
                        <span className=" relative text-xl  font-bold">
                          Categoria da obra: {obra?.category}
                        </span>
                        <p className=" relative text-base">
                          {obra?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <Modal
        maxWidth="w-full h-full  "
        isOpen={seeArtistDetails}
        onClose={() => setSeeArtistDetails(false)}
      >
        <div className="w-full h-full flex flex-col bg-[#4c88c4] ">
          <div className="w-full ">
            <button
              onClick={() => setSeeArtistDetails(false)}
              className="p-5 transform-effect w-fit right-1 top-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <div className="w-full flex float-right justify-end">
            <PDFViewer url={bookUrl} />
          </div>
        </div>
      </Modal>
    </>
  );
}
