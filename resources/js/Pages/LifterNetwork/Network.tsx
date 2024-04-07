import { useStateContext } from '@/contexts/PaginaActualContext';
import Container from '@/Layouts/Container';
import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect } from 'react';
import UploadSong from './UploadSong';
import { BiMusic, BiVideo } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';

function Network() {
  const { currentPage, setCurrentPage } = useStateContext();

  useEffect(() => {
    setCurrentPage(<UploadSong />);
  }, []);

  return (
    <AppLayout title="Uploads">
      <Container>
        <div className="w-full flex flex-col justify-center items-start">
          <div className="w-full h-14  justify-between py-1 bg-gradient-to-br from-[#00395f] to-[#005792] ">
            <div className="w-full h-full flex  flex-row justify-center items-center mb-1 text-[#fff] text-xl ">
              <>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadSong'
                      ? setCurrentPage(<UploadSong />)
                      : ''
                  }
                  className={`flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter:
            ${
              currentPage.type.name == 'UploadSong'
                ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                >
                  <BiMusic className={`icon w-5 h-5 md:w-10 md:h-10`} />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadSong'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Músicas
                  </span>
                </button>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadVideo'
                      ? setCurrentPage(<UploadVideo />)
                      : ''
                  }
                  className={` flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter: ${
                    currentPage.type.name == 'UploadVideo'
                      ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                      : ''
                  } `}
                >
                  <BiVideo className="icon w-5 h-5 md:w-10 md:h-10" />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadVideo'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Vídeos
                  </span>
                </button>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadSong'
                      ? setCurrentPage(<UploadImage />)
                      : ''
                  }
                  className={` flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter:
            ${
              currentPage.type.name == 'UploadImage'
                ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                >
                  <BsImage className="icon w-5 h-5 md:w-10 md:h-10" />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadImage'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Imagens
                  </span>
                </button>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadSong'
                      ? setCurrentPage(<UploadSong />)
                      : ''
                  }
                  className={`flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter:
            ${
              currentPage.type.name == 'UploadSong'
                ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                >
                  <BiMusic className={`icon w-5 h-5 md:w-10 md:h-10`} />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadSong'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Músicas
                  </span>
                </button>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadVideo'
                      ? setCurrentPage(<UploadVideo />)
                      : ''
                  }
                  className={` flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter: ${
                    currentPage.type.name == 'UploadVideo'
                      ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                      : ''
                  } `}
                >
                  <BiVideo className="icon w-5 h-5 md:w-10 md:h-10" />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadVideo'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Vídeos
                  </span>
                </button>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadSong'
                      ? setCurrentPage(<UploadImage />)
                      : ''
                  }
                  className={` flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter:
            ${
              currentPage.type.name == 'UploadImage'
                ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                >
                  <BsImage className="icon w-5 h-5 md:w-10 md:h-10" />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadImage'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Imagens
                  </span>
                </button>
                <button
                  onClick={() =>
                    currentPage.type.name != 'UploadSong'
                      ? setCurrentPage(<UploadImage />)
                      : ''
                  }
                  className={` flex flex-col w-full h-full justify-center items-center text-xs transform-effect first-letter:
            ${
              currentPage.type.name == 'UploadImage'
                ? ' text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                >
                  <BsImage className="icon w-5 h-5 md:w-10 md:h-10" />
                  <span
                    className={` ${
                      currentPage.type.name == 'UploadImage'
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Imagens
                  </span>
                </button>
              </>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center ">
            {currentPage}
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}

export default Network;
