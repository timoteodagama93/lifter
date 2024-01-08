import { ActionMessage } from '@/Components';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState, useRef, SetStateAction } from 'react';
import Swal from 'sweetalert2';

export default function ContestInfo({ setContestId }) {
  const form = useForm({
    _method: 'PUT',
    designacao: '',
    descricao: '',
    categoria: 'Música',
    subcategoria: '',
    cover: null as File | null,
  });
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [disableAfterSave, setDisableAfterSave] = useState(false);

  function saveContestInformation() {
    form.post(route('create-contest'), {
      errorBag: 'contestCreationCoverFails',
      preserveScroll: true,
      onSuccess: response => {
        form.setData('designacao', '');
        form.setData('descricao', '');
        form.reset();
        setDisableAfterSave(true);
        let n = response.props.contests?.length;
        var c = response.props?.contests;
        var contest = c[n - 1];
        setContestId(contest.id);
        clearPhotoFileInput();
        setPhotoPreview('');
        Swal.fire({
          title: 'Bem salvo.',
          text: 'Informações sobre prémios salvas com sucesso.',
          icon: 'success',
        });
      },
    });
  }

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    form.setData('cover', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function deletePhoto() {
    router.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('cover', null);
    }
  }

  return (
    <FormSection
      onSubmit={saveContestInformation}
      title={'Informação básicas'}
      description={`Adicione uma imagem da competição, a sua designação e uma descrição resumida de modos a chamar a atenção imediata aos interessados.`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >
      {/* <!-- COntest Photo --> */}
      {page.props.jetstream.managesProfilePhotos ? (
        <div className="col-span-6 sm:col-span-4">
          {/* <!-- Contest Photo File Input --> */}
          <input
            type="file"
            className="hidden"
            ref={photoRef}
            onChange={updatePhotoPreview}
          />

          <InputLabel htmlFor="photo" value="Photo" />

          {photoPreview ? (
            // <!-- New Contest Photo Preview -->
            <div className="mt-2">
              <span
                className="block rounded-full w-20 h-20"
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundImage: `url('${photoPreview}')`,
                }}
              ></span>
            </div>
          ) : null}

          <SecondaryButton
            className="mt-2 mr-2"
            type="button"
            onClick={selectNewPhoto}
          >
            Select A New Photo
          </SecondaryButton>

          <InputError message={form.errors.cover} className="mt-2" />
        </div>
      ) : null}

      {/* <!-- Contest Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Designação da competição" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.designacao}
          onChange={e => form.setData('designacao', e.currentTarget.value)}
        />
        <InputError message={form.errors.designacao} className="mt-2" />
      </div>

      {/* <!-- Contest Description--> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel
          htmlFor="description"
          value="Descrição resumida da competição"
        />
        <textarea
          id="description"
          rows={5}
          className="mt-1 block w-full text-gray-900"
          value={form.data.descricao}
          onChange={e => form.setData('descricao', e.currentTarget.value)}
        />
        <InputError message={form.errors.descricao} className="mt-2" />
      </div>

      {/* <!-- Contest TYPE--> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="tipo" value="Categoria do concurso" />
        
        
        <select
          id="categoria"
          className="mt-1 block w-full text-gray-900"
          value={form.data.categoria}
          onChange={e => form.setData('categoria', e.currentTarget.value)}
          defaultValue="Música"
        >
          <option value="Música">Música</option>
          <option value="Dança">Dança</option>
          <option value="Artes Mistas">Artes mistas</option>
          <option value="Literatura">Literatura</option>
          <option value="Artes Visuais">Artes visuais</option>
        </select>
        <InputError message={form.errors.categoria} className="mt-2" />
      </div>

      {/* <!-- Contest SUBCATEGORIA--> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="subcategoria" value="Sub-categoria" />
        <select
          id="subcategoria"
          className="mt-1 block w-full text-gray-900"
          value={form.data.subcategoria}
          onChange={e => form.setData('subcategoria', e.currentTarget.value)}
          defaultValue="TODOS"
        >
          <option value="">Selecione a subcategoria</option>

          {form.data.categoria == 'Música' && (
            <>
              <option>TODOS</option>
              <option>GOSPEL</option>
              <option>KUDURO</option>
              <option>RAP</option>
              <option>HOUSE</option>
              <option>SEMBA</option>
              <option>KIZOMBA</option>
            </>
          )}

          {form.data.categoria == 'Dança' && <option>TODOS</option>}

          {form.data.categoria == 'Artes Mistas' && (
            <>
              <option>TODAS SUBCATEGORIAS</option>
              <option>Cinema</option>
              <option>Teatro</option>
              <option>Comédia</option>
              <option>Ópera</option>
            </>
          )}

          {form.data.categoria == 'Literatura' && (
            <>
              <option>TODAS SUBCATEGORIAS</option>
              <option>Poesia</option>
              <option>Romances</option>
              <option>Ficção</option>
              <option>Drama</option>
              <option>Conto</option>
            </>
          )}

          {form.data.categoria == 'Artes Visuais' && (
            <>
              <option>TODAS SUBCATEGORIAS</option>
              <option>Fotografia</option>
              <option>Pintura</option>
              <option>Desenho</option>
              <option>Escultura</option>
              <option>Arquitectura</option>
            </>
          )}

          {form.data.categoria == 'Artes Úteis' && (
            <>
              <option>Artes Úteis</option>
            </>
          )}
        </select>
        <InputError message={form.errors.categoria} className="mt-2" />
      </div>
    </FormSection>
  );
}
