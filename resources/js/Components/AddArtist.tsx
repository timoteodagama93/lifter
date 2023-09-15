import React, { useRef, useState } from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { BiHappy } from 'react-icons/bi';
import { router } from '@inertiajs/core';
import SecondaryButton from './SecondaryButton';
import axios from 'axios';
import { load } from '@syncfusion/ej2-react-grids';
export default function AddArtist({ setPagina }) {
  const formArtist = useForm({
    name: '',
    genre: 'Kuduro',
    contact: '',
    about: '',
    country: 'Angola',
    city: 'Luanda',
    terms: false,
    cover: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', formArtist.data.name);
    formData.append('genre', formArtist.data.genre);
    formData.append('contact', formArtist.data.contact);
    formData.append('about', formArtist.data.about);
    formData.append('country', formArtist.data.country);
    formData.append('city', formArtist.data.city);
    formData.append('terms', false);
    formData.append('cover', photo);

    setIsLoading(true);
    axios
      .post('new-artist', formData)
      .then(r => {
        setIsLoading(false);
        formArtist.setData('name', '');
        formArtist.setData('genre', 'Kuduro');
        formArtist.setData('contact', '');
        formArtist.setData('about', '');
        formArtist.setData('country', 'Angola');
        formArtist.setData('city', 'Luanda');
        clearPhotoFileInput();
        setPhotoPreview(null);
        router.reload();
      })
      .catch(e => {
        setIsLoading(false);
        console.log('ERRO AO CRIAR ARTISTA: ' + e);
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
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? (
        <div className="relative flex justify-center items-center bg-black text-white z-50 top-0 left-0 w-screen h-full animate-ping">
          <h1 className="text-xl">Carregando</h1>
        </div>
      ) : (
        <>
          <div className="p-5 h-full m-5 shadow-lg shadow-black">
            <p className="w-full text-xl flex justify-center uppercase">
              Criar novo perfil de artista
            </p>
            <SectionBorder></SectionBorder>
            <form onSubmit={onSubmit} className="">
              {photoPreview ? (
                // <!-- New Profile Photo Preview -->
                <div className="">
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

              <div className="col-span-6 sm:col-span-4">
                {/* <!-- Profile Photo File Input --> */}
                <input
                  type="file"
                  className=""
                  ref={photoRef}
                  required
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
                <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
                <select
                  id="genre"
                  className="mt-1 block w-full"
                  value={formArtist.data.genre}
                  onChange={e =>
                    formArtist.setData('genre', e.currentTarget.value)
                  }
                  required
                >
                  <option>Kuduro</option>
                  <option>House</option>
                  <option>Semba</option>
                  <option>Kizomba</option>
                  <option>RnB</option>
                  <option>Rap</option>
                  <option>Naija</option>
                  <option>Hip Hop</option>
                </select>
                <InputError
                  className="mt-2"
                  message={formArtist.errors.genre}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="contact">Contacto para shows</InputLabel>
                <span>Indicativo de país, ex: Angola - (+244)</span>
                <TextInput
                  id="contact"
                  type="text"
                  className="mt-1 block w-full"
                  value={formArtist.data.contact}
                  onChange={e =>
                    formArtist.setData('contact', e.currentTarget.value)
                  }
                  required
                  autoComplete="new-password"
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
                  className="mt-1 block w-full"
                  value={formArtist.data.country}
                  onChange={e =>
                    formArtist.setData('country', e.currentTarget.value)
                  }
                  required
                >
                  <option value="angola">Angola</option>
                  <option value="mocambique">Moçambique</option>
                  <option value="caboverde">Cabo Verde</option>
                  <option value="portugal">Portugal</option>
                  <option value="brasil">Brasil</option>
                  <option value="outro">Outro</option>
                </select>
                <InputError
                  className="mt-2"
                  message={formArtist.errors.country}
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="city">Cidade</InputLabel>
                <select
                  id="city"
                  className="mt-1 block w-full"
                  value={formArtist.data.city}
                  onChange={e =>
                    formArtist.setData('city', e.currentTarget.value)
                  }
                  required
                >
                  <option value="luanda">Luanda</option>
                  <option value="benguela">Benguela</option>
                  <option value="malanje">Malanje</option>
                  <option value="huila">Huila</option>
                  <option value="bengo">Bengo</option>
                  <option value="bie">Bíe</option>
                  <option value="moxico">Moxico</option>
                  <option value="zaire">Zaire</option>
                  <option value="uige">Uíge</option>
                  <option value="cuanza-norte">Cuanza Norte</option>
                  <option value="cuanza-sul">Cuanza Sul</option>
                  <option value="lunda-norte">Luanda Norte</option>
                  <option value="lunda-sul">Lunda Sul</option>
                  <option value="cunene">Cunene</option>
                  <option value="cunene">Outra</option>
                </select>
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
                  className="mt-1 block w-full"
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
