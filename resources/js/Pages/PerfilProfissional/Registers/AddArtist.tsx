import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import SecondaryButton from '../../../Components/SecondaryButton';
import Swal from 'sweetalert2';
import { BiArrowBack } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Welcome from './Welcome';
import Artist from '../Artista/Index';
import { Loader } from '@/Components';
import useTypedPage from '@/Hooks/useTypedPage';
import { generos } from '@/assets/constants';

import { countries } from 'countries-list';
import route from 'ziggy-js';
import Checkbox from '@/Components/Checkbox';
const paises = [...Object.values(countries)];
export default function AddArtist({}) {
  const page = useTypedPage();
  const { setCurrentPage } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const [indicePais, setIndicePais] = useState(7);

  const formArtist = useForm({
    name: page.props.auth.user?.name,
    category: 'musico',
    genre: 'House',
    contact: '',
    about: '',
    country: paises[indicePais].name,
    city: 'Luanda',
    terms: false,
    cover: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    formArtist.setData(
      'contact',
      paises[indicePais].phone + ' ' + formArtist.data.contact,
    );
    formArtist.post('new-artist', {
      onError: () => {
        setIsLoading(false);
      },
      onSuccess: () => {
        setIsLoading(false);
        setCurrentPage(<Artist />);
        Swal.fire({
          title: 'Conta criada com sucesso',
          text: 'Seja bem-vindo à comunidade Lifter, a arte é sua e a felicidade é toda nossa, obrigado.',
          icon: 'success',
        });
      },
    });
  }
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  function selectNewPhoto() {
    photoRef.current?.click();
  }

  const [photo, setPhoto] = useState(photoRef.current?.files?.[0]);
  function updatePhotoPreview() {
    setPhoto(photoRef.current?.files?.[0]);
    if (!photo) {
      return;
    }

    formArtist.setData('cover', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      formArtist.setData('cover', null);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="relative flex justify-center items-cente text-bold  z-50 top-0 left-0 w-full h-full flex-col">
          <Loader title="Criando a conta..." />
          <p className="text-base">
            Estamos a deixar tudo pronto para si, aguarde enquanto o processo
            finaliza!
          </p>
        </div>
      ) : (
        <>
          <div className=" p-5 m-1 shadow-lg shadow-black">
            <p className="w-full text-xl flex justify-between uppercase gap-5">
              <button
                onClick={() => setCurrentPage(<Welcome />)}
                className="transform-effect px-5 "
              >
                <BiArrowBack className="text-xl" />
              </button>
              Criar novo perfil de artista
            </p>
            <SectionBorder></SectionBorder>
            <form
              onSubmit={onSubmit}
              className=""
              encType="multipart/form-data"
            >
              {photoPreview ? (
                // <!-- New Profile Photo Preview -->
                <div className="w-full flex justify-center">
                  <span
                    className="block rounded-lg w-36 h-36 "
                    style={{
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundImage: `url('${photoPreview}')`,
                    }}
                  ></span>
                </div>
              ) : (
                ''
              )}

              {formArtist.progress && (
                <progress value={formArtist.progress.percentage} max={100}>
                  {formArtist.progress.percentage}%
                </progress>
              )}

              <div className="col-span-6  sm:col-span-4 flex justify-center">
                {/* <!-- Profile Photo File Input --> */}
                <input
                  type="file"
                  className="hidden"
                  ref={photoRef}
                  onChange={updatePhotoPreview}
                />

                <InputLabel htmlFor="file" value="Ficheiro" />

                <SecondaryButton
                  className="m-2"
                  type="button"
                  onClick={selectNewPhoto}
                >
                  Selecionar Imagem
                </SecondaryButton>

                <InputError message="" className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="name">Nome artístico</InputLabel>
                <span className="hidden">
                  Nome artístico, ciclo profissional
                </span>
                <TextInput
                  id="name"
                  type="text"
                  className="mt-1 block w-full"
                  value={formArtist.data.name}
                  onChange={e =>
                    formArtist.setData('name', e.currentTarget.value)
                  }
                  required
                  autoComplete="new-password"
                />
                <InputError className="mt-2" message={formArtist.errors.name} />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="category">Tipo de conta</InputLabel>
                <select
                  id="category"
                  className="mt-1 block w-full text-black"
                  value={formArtist.data.category}
                  onChange={e =>
                    formArtist.setData('category', e.currentTarget.value)
                  }
                  required
                >
                  <option value="musico"> Músico </option>
                  <option value="musico"> Artista plástico </option>
                </select>
                <InputError
                  className="mt-2"
                  message={formArtist.errors.category}
                />
              </div>

              {formArtist.data.category === 'musico' ? (
                <div className="mt-4">
                  <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
                  <select
                    id="genre"
                    className="mt-1 block w-full text-black"
                    value={formArtist.data.genre}
                    onChange={e =>
                      formArtist.setData('genre', e.currentTarget.value)
                    }
                    required
                  >
                    {generos.map(genre => (
                      <option value={genre.value}> {genre.title} </option>
                    ))}
                  </select>
                  <InputError
                    className="mt-2"
                    message={formArtist.errors.genre}
                  />
                </div>
              ) : (
                ''
              )}

              <div className="mt-4">
                <InputLabel htmlFor="contact">Contacto para shows</InputLabel>
                <span>Telefone para fins comerciais e profissionais</span>
                <TextInput
                  id="contact"
                  type="tel"
                  className="mt-1 block w-full"
                  value={formArtist.data.contact}
                  onChange={e =>
                    formArtist.setData('contact', e.currentTarget.value)
                  }
                  required
                  autoComplete="tel"
                />
                <InputError
                  className="mt-2"
                  message={formArtist.errors.contact}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="country">País</InputLabel>
                <select
                  id="country"
                  className="mt-1 block w-full text-black"
                  value={formArtist.data.country}
                  onChange={e => {
                    setIndicePais(Number.parseInt(e.currentTarget.value));
                    formArtist.setData('country', paises[indicePais].name);
                  }}
                  required
                >
                  {Object.values(countries).map((pais, i) => (
                    <option value={i}> {pais.name} </option>
                  ))}
                </select>
                <InputError
                  className="mt-2"
                  message={formArtist.errors.country}
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="city">Cidade</InputLabel>
                <TextInput
                  id="city"
                  className="mt-1 block w-full text-black"
                  value={formArtist.data.city}
                  onChange={e =>
                    formArtist.setData('city', e.currentTarget.value)
                  }
                  autoComplete="city"
                  required
                />
                <InputError
                  className="mt-2"
                  message={formArtist.errors.country}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="about">Sobre o artista</InputLabel>
                <span>Apresentação artística chamativa. </span>
                <textarea
                  id="about"
                  className="mt-1 block w-full text-black"
                  value={formArtist.data.about}
                  onChange={e =>
                    formArtist.setData('about', e.currentTarget.value)
                  }
                  required
                />
                <InputError
                  className="mt-2"
                  message={formArtist.errors.about}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="terms">
                  <div className="flex items-center">
                    <Checkbox
                      name="terms"
                      id="terms"
                      checked={formArtist.data.terms}
                      onChange={e =>
                        formArtist.setData('terms', e.currentTarget.checked)
                      }
                      required
                    />

                    <div className="ml-2  text-gray-500 rounded-md ">
                      Concordo com os{' '}
                      <a
                        target="_blank"
                        href={route('terms.show')}
                        className="underline text-sm hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      >
                        Termos de serviços
                      </a>{' '}
                      e{' '}
                      <a
                        target="_blank"
                        href={route('policy.show')}
                        className="underline text-sm hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      >
                        Politicas de privacidade
                      </a>
                    </div>
                  </div>
                  <InputError
                    className="mt-2"
                    message={formArtist.errors.terms}
                  />
                </InputLabel>
              </div>

              <div className="flex items-center justify-end mt-4">
                <PrimaryButton
                  className={classNames('ml-4', {
                    'opacity-25': formArtist.processing,
                  })}
                  disabled={formArtist.processing}
                >
                  Criar perfil
                </PrimaryButton>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
