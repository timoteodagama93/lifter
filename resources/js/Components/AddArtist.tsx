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
import AddCover from './AddCover';

export default function AddArtist() {
  const formArtist = useForm({
    name: '',
    genre: 'Kuduro',
    contact: '',
    about: '',
    country: 'Angola',
    city: 'Luanda',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios.post('new-artist', formArtist.data).then(response => {
    });
  }

  return (
    <div className="p-5 h-[60vh] mb-36 overflow-y-auto m-5 shadow-lg shadow-black">
      <p className="w-full text-xl flex justify-center uppercase">
        Registrar novo artista
      </p>
      <SectionBorder></SectionBorder>
      <form onSubmit={onSubmit} className="">
        <div className="mt-4">
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
          <InputError className="mt-2" message={formArtist.errors.name} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
          <select
            id="genre"
            className="mt-1 block w-full"
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
            className="mt-1 block w-full"
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
          <select
            id="city"
            className="mt-1 block w-full"
            value={formArtist.data.city}
            onChange={e => formArtist.setData('city', e.currentTarget.value)}
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
            <option value="cunene">Outro</option>
          </select>
          <InputError className="mt-2" message={formArtist.errors.country} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="about">Sobre o artista</InputLabel>
          <span>Apresentação artística chamativa. </span>
          <textarea
            id="about"
            className="mt-1 block w-full"
            value={formArtist.data.about}
            onChange={e => formArtist.setData('about', e.currentTarget.value)}
            required
          />
          <InputError className="mt-2" message={formArtist.errors.about} />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton
            className={classNames('ml-4', {
              'opacity-25': formArtist.processing,
            })}
            disabled={formArtist.processing}
          >
            Registrar artista
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
