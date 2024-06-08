import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect, useState } from 'react';
import Article from './Article';
import Container from '@/Layouts/Container';
import RichTextEditor from '@/Components/Editor/RichTextEditor.js';
import DisplayContent from '@/Components/Editor/DisplayContent';
import axios from 'axios';
import { Loader } from '@/Components';
import { BiShare } from 'react-icons/bi';
import Modal from '@/Components/Modal';

function Index() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadPosts() {
    setLoading(true);
    axios
      .post('/get-articles')
      .then(response => {
        if (response.status === 200) {
          setArticles(response.data);
          console.log(response.data);
        }
        setLoading(false);
      })
      .catch(error => {});
    console.log(articles);
  }
  useEffect(() => {
    loadPosts();
  }, []);

  const [createPost, setCreatePost] = useState(false);

  return (
    <AppLayout title="Notícias">
      <Container>
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="w-full relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
                <div className="w-full h-full  flex flex-col gap-1 justify-cebter items-center rounded-lg">
                  <div className="w-full flex justify-between items-center p-1 md:px-5 border-b ">
                    <div className="w-4/5 mx-auto md:mx-6">
                      <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Pesquisar"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="p-2.5 ml-2 text-sm font-medium text-white bg-[#0094f8] rounded-lg border border-[#0094f8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                          </svg>
                        </button>
                      </form>
                    </div>

                    <div className="w-1/5 flex flex-row justify-center items-center">
                      <button
                        onClick={() => setCreatePost(true)}
                        className="transform-effect p-1 justify-center items-center w-full flex flex-col _bg-[#f6cc33] text-[#0094f8] "
                      >
                        {' '}
                        <BiShare className="w-10 h-auto font-bold" />{' '}
                        <span className="flex">
                          Publicar{' '}
                          <span className="hidden md:flex ml-2">
                            Artigo
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full">
                    {' '}
                    {articles.length > 0 ? (
                      <>
                        {articles.map(article => (
                          <DisplayContent article={article} />
                        ))}
                      </>
                    ) : (
                      <>Nenhum artigo</>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          <Modal isOpen={createPost} onClose={setCreatePost}>
            <>
              <div className="w-full flex justify-end items-center p-1 md:px-5 border-b ">
                <div className="w-1/5 flex flex-row justify-center items-center">
                  <button
                    onClick={() => {}}
                    className="transform-effect p-1 justify-center items-center w-full flex flex-col _bg-[#f6cc33] text-[#0094f8] "
                  >
                    {' '}
                    <BiShare className="w-10 h-auto font-bold" />{' '}
                    <span className="flex">
                      Editar <span className="hidden md:flex ml-2">Artigo</span>
                    </span>
                  </button>
                </div>
              </div>

              <RichTextEditor />
            </>
          </Modal>
        </>
      </Container>
    </AppLayout>
  );
}

export default Index;
