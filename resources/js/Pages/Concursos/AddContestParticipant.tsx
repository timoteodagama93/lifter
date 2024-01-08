import { Loader } from '@/Components';
import InputError from '@/Components/InputError';
import useTypedPage from '@/Hooks/useTypedPage';
import { useGetArtistSongsQuery } from '@/redux/services/coreApi';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdCloseFullscreen } from 'react-icons/md';

import Swal from 'sweetalert2';

function AddContestParticipant({ contest }) {
  const page = useTypedPage();
  const [jaInscrito, setJaInscrito] = useState(false);

  const [loading, setLoading] = useState(false);
  const [amIArtist, setamIArtist] = useState(
    page.props.artist_account == null ? false : true,
  );

  const participant =
    contest.categoria == 'Música'
      ? page.props.artist_account
      : page.props.auth.user;

  const form = useForm({
    contest_id: contest.id,
    collection_id: '',
    owner_collection_id: participant?.id,
    contact:
      contest.categoria == 'Música' ? participant?.phone : participant?.contact,
    bio: contest.categoria == 'Música' ? participant?.about : '',
  });

  const [collections, setCollections] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    axios
      .post(`/get-user-collections-for-contest`, {
        contest_id: contest.id,
      })
      .then(response => {
        console.log('USER COLLECTIONS RESULTS');
        console.log(response.data);
        setCollections(response.data);
      })
      .catch(error => {});
  }, []);

  const joinToContest = () => {
    setLoading(true);
    form.post('add-participant', {
      onSuccess: () => {
        setLoading(false);
        setJaInscrito(true);
        Swal.fire({
          title: 'Inscrito',
          text: 'Sua participação foi registrada, agora é um usuário inscrito.',
          icon: 'success',
        });
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post('am-I-participant', {
        contest_id: contest.id,
      })
      .then(response => {
        setLoading(false);
        console.log(response.data);
      })
      .catch(errors => {});
  }, []);

  return (
    <>
      {loading ? (
        <div className="p-5">
          <Loader title="Verificação..." />
          <p>
            Estamos a verificar sua conta artística e alguns dados adicionais
          </p>
        </div>
      ) : (
        <>
          {!jaInscrito ? (
            <>
              <h1 className="text-center font-bold text-4xl">
                Juntar-se ao concurso
              </h1>
              {amIArtist ? (
                <>
                  {!form.processing ? (
                    <>
                      <form
                        onSubmit={joinToContest}
                        action=""
                        className="w-full flex flex-col p-5"
                      >
                        <p className="text-base">
                          Por favor, confirme os seus detalhes da participação
                          ao concurso.
                        </p>
                        <div className="flex flex-col p-1">
                          <label htmlFor="contest_id">
                            Está prestes a inscrever-se no seguinte concurso
                          </label>
                          <input
                            type="text"
                            name="contest_id"
                            id="contest_id"
                            disabled
                            className="hidden"
                            value={contest.id}
                            onChange={e =>
                              form.setData('contest_id', e.target.value)
                            }
                          />
                          <input
                            type="text"
                            name="contest_id"
                            id="contest_id"
                            disabled
                            value={contest.designacao}
                          />

                          <InputError message={form.errors.contest_id} />
                        </div>

                        {form.data.contest_id !== '' ? (
                          <>
                            <div className="flex flex-col p-1">
                              <label htmlFor="contest_id">Nome artístico</label>
                              <input
                                type="text"
                                name="contest_id"
                                id="contest_id"
                                className="hidden"
                                value={form.data.contest_id}
                              />
                              <input
                                type="text"
                                disabled
                                value={participant?.name}
                              />
                              <InputError message={form.errors.contest_id} />
                            </div>
                            <div className="flex flex-col p-1">
                              <label htmlFor="contact">
                                O seu contacto é o:
                              </label>
                              <input
                                type="text"
                                name="contact"
                                id="contact"
                                value={form.data.contact}
                                required
                                disabled
                              />
                              <InputError message={form.errors.contact} />
                            </div>

                            {isFetching ? (
                              <Loader title="Carregando suas músicas" />
                            ) : (
                              <div className="flex flex-col p-1">
                                <label htmlFor="song_id">
                                  Selecione o item com o qual deseja concorrer.
                                </label>
                                <select
                                  name="collection_id"
                                  id="collection_id"
                                  required
                                  value={form.data.collection_id}
                                  onChange={e => {
                                    form.setData(
                                      'collection_id',
                                      e.currentTarget.value,
                                    );
                                  }}
                                >
                                  <option value="">Selecione a coleção</option>
                                  {collections.map(collection => (
                                    <option value={collection.id}>
                                      {collection.title}
                                    </option>
                                  ))}
                                </select>
                                <InputError
                                  message={form.errors.collection_id}
                                />
                                <InputError
                                  message={
                                    form.data.collection_id == ''
                                      ? 'Não é possível inscrever-se sem selecionar uma música.'
                                      : ''
                                  }
                                />
                              </div>
                            )}
                            <div className="flex flex-col p-1">
                              <label htmlFor="ocupation">
                                Apresentação adicional
                              </label>
                              <textarea
                                name="bio"
                                id="bio"
                                required
                                value={form.data.bio}
                                onChange={e =>
                                  form.setData('bio', e.target.value)
                                }
                              />
                              <InputError message={form.errors.bio} />
                            </div>
                            <div className="w-full p-2 flex justify-center items-center ">
                              <button
                                disabled={
                                  form.data.collection_id == '' ? true : false
                                }
                                className=" bg-cyan-300 text-white font-bold p-4 transform-effect text-xl "
                              >
                                Juntar-se ao concurso
                              </button>
                            </div>
                          </>
                        ) : (
                          ''
                        )}
                      </form>
                    </>
                  ) : (
                    <Loader title="Enviando requisição..." />
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-xl text-center">
                    Apenas artistas podem inscrever-se, você não possui um
                    perfil artístico activo. Visite a área de gestão de perfís e
                    crie um perfil caso ainda não o tenha feito.
                  </h1>
                </>
              )}
            </>
          ) : (
            <>
              <h1 className="text-center font-bold text-4xl">
                Já é um participante desta competição.
              </h1>
              <p className="text-base justify-normal p-2">
                Podes começar a promover a sua participação, já és um dos
                candidatos. Vá para o seu perfil e visualize o seu desempenho no
                concurso.
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}

export default AddContestParticipant;
