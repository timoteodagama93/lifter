
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react'

export default function EditSong({ song, setPagina }) {
    const formArtist = useForm({
      id: song.id,
      artist_id: song.artist_id,
      title: song.title,
      genre: song.genre,
      artist: song.artist,
      gravadora: song.gravadora,
      participacoes: song.participacoes,
      letra: song.letra,
      cover: null as File | null,
    });
  
    function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      formArtist.post('/update-song', {
        onSuccess: () => setPagina(<></>),
        onError: () => alert('Erro na actualização, tente novamente'),
        onFinish: () => setPagina(<></>),
      });
    }
  
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null);
  
    function selectNewPhoto() {
      photoRef.current?.click();
    }
  
    function updatePhotoPreview() {
      const photo = photoRef.current?.files?.[0];
  
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
      <div className="p-5 h-[60vh] mb-36 overflow-y-auto m-1 shadow-lg shadow-black">
        <p className="w-full text-xl flex justify-center uppercase">
          Actualizar dados da música
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
              required
              ref={photoRef}
              onChange={updatePhotoPreview}
            />
  
            <InputLabel htmlFor="file" value="Ficheiro" />
  
            <SecondaryButton
              className="m-2"
              type="button"
              onClick={selectNewPhoto}
            >
              Selecionar Imagem de capa
            </SecondaryButton>
          </div>
  
          <div className="">
            <InputLabel htmlFor="title">Nome artístico</InputLabel>
            <span className="hidden">Nome artístico, ciclo profissional</span>
            <TextInput
              id="title"
              type="text"
              className="mt-1 block w-full"
              value={formArtist.data.title}
              onChange={e => formArtist.setData('title', e.currentTarget.value)}
              required
              autoComplete="new-password"
            />
            <InputError className="mt-1" message={formArtist.errors.title} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
            <TextInput
              id="genre"
              className="mt-1 block w-full"
              value={formArtist.data.genre}
              onChange={e => formArtist.setData('genre', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={formArtist.errors.genre} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="artist">Artista</InputLabel>
            <span></span>
            <TextInput
              id="artist"
              type="text"
              className="mt-1 block w-full"
              value={formArtist.data.artist}
              onChange={e => formArtist.setData('artist', e.currentTarget.value)}
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2" message={formArtist.errors.artist} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="gravadora">Gravadora</InputLabel>
            <TextInput
              id="gravadora"
              className="mt-1 block w-full"
              value={formArtist.data.gravadora}
              onChange={e =>
                formArtist.setData('gravadora', e.currentTarget.value)
              }
              required
            />
            <InputError className="mt-2" message={formArtist.errors.gravadora} />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="participacoes">Participantes</InputLabel>
            <TextInput
              id="participacoes"
              className="mt-1 block w-full"
              value={formArtist.data.participacoes}
              onChange={e =>
                formArtist.setData('participacoes', e.currentTarget.value)
              }
              required
            />
  
            <InputError
              className="mt-2"
              message={formArtist.errors.participacoes}
            />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="letra">Letra da música</InputLabel>
            <span>Apresentação artística chamativa. </span>
            <TextInput
              id="letra"
              className="mt-1 block w-full"
              value={formArtist.data.letra}
              onChange={e => formArtist.setData('letra', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={formArtist.errors.letra} />
          </div>
  
          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className={`'ml-4`} disabled={formArtist.processing}>
              Actualizar informações
            </PrimaryButton>
          </div>
        </form>
      </div>
    );
    1;
  }
  
