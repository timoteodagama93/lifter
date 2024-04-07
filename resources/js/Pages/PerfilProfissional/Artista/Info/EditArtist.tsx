
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React from 'react'

export default function EditArtist({ artist, setPagina }) {
    const formArtist = useForm({
      id: artist.id,
      name: artist.name,
      genre: artist.genres,
      contact: artist.contact,
      about: artist.about,
      country: artist.country,
      city: artist.city,
    });
  
    function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      axios.post('/update-artist', formArtist).then(response => {
        if (response.status === 200) {
          setPagina(<></>);
        }
      });
    }
  
    return (
      <div className="relative w-full h-full lg:h-[69vh] overflow-y-auto m-1 border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center  ">
        <p className="w-full text-xl flex justify-center uppercase">
          Actualizar dados do artista
        </p>
        <SectionBorder></SectionBorder>
        <form onSubmit={onSubmit} className="" encType="multipart/form-data">
          {formArtist.progress && (
            <progress value={formArtist.progress.percentage} max={100}>
              {formArtist.progress.percentage}%
            </progress>
          )}
  
          <div className="">
            <InputLabel htmlFor="name">Nome artístico</InputLabel>
            <span className="hidden">Nome artístico, ciclo profissional</span>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={formArtist.data.name}
              onChange={e => formArtist.setData('name', e.currentTarget.value)}
              required
              autoComplete="new-password"
            />
            <InputError className="mt-1" message={formArtist.errors.name} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
            <select
              id="genre"
              className="mt-1 block w-full text-gray-700"
              value={formArtist.data.genre}
              onChange={e => formArtist.setData('genre', e.currentTarget.value)}
              required
            >
              <option value="kuduro">Kuduro</option>
              <option value="house">House</option>
              <option value="semba">Semba</option>
              <option value="kizomba">Kizomba</option>
              <option value="rnb">RnB</option>
              <option value="rap">Rap</option>
              <option value="naija">Naija</option>
              <option value="hiphop">Hip Hop</option>
            </select>
            <InputError className="mt-2" message={formArtist.errors.genre} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="contact">Contacto para shows</InputLabel>
            <span>Indicativo de país, ex: Angola - (+244)</span>
            <TextInput
              id="contact"
              type="text"
              className="mt-1 block w-full"
              value={formArtist.data.contact}
              onChange={e => formArtist.setData('contact', e.currentTarget.value)}
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2" message={formArtist.errors.contact} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="country">País</InputLabel>
            <select
              id="country"
              className="mt-1 block w-full text-gray-900"
              value={formArtist.data.country}
              onChange={e => formArtist.setData('country', e.currentTarget.value)}
              required
            >
              <option value="angola">Angola</option>
              <option value="mocambique">Moçambique</option>
              <option value="caboverde">Cabo Verde</option>
              <option value="portugal">Portugal</option>
              <option value="brasil">Brasil</option>
              <option value="outro">Outro</option>
            </select>
            <InputError className="mt-2" message={formArtist.errors.country} />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="city">Cidade</InputLabel>
            <TextInput
              id="city"
              className="mt-1 block w-full"
              value={formArtist.data.city}
              onChange={e => formArtist.setData('city', e.currentTarget.value)}
              required
            />
  
            <InputError className="mt-2" message={formArtist.errors.country} />
          </div>
  
          <div className="mt-4">
            <InputLabel htmlFor="about">Sobre o artista</InputLabel>
            <span>Apresentação artística chamativa. </span>
            <textarea
              id="about"
              className="mt-1 block w-full text-gray-700"
              value={formArtist.data.about}
              onChange={e => formArtist.setData('about', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={formArtist.errors.about} />
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