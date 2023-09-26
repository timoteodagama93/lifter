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
    estilo: 'TODOS',
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

    /*
    const data = new FormData();
    data.append('designacao', form.data.designacao);
    data.append('descricao', form.data.descricao);
    data.append('estilo', form.data.estilo);
    data.append('cover', form.data.cover);
    
    setProcessing(true);
    axios
      .post(route('create-contest'), data)
      .then(response => {
        console.log(response.data.id);
        setContestId(response.data.id);
        Swal.fire({
          title: 'Salvo',
          text: 'Informações salvas. Adicione os demais detalhes.',
          icon: 'success',
        });
        setProcessing(false);
      })
      .catch(error => {
        Swal.fire({
          title: 'Ooops, algo correu mal.',
          text: 'Parece que houve um problema ao salvar as informações. Reenvie.',
          icon: 'error',
        });
        console.log(error);
      });*/
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

      {/* <!-- Contest Description--> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="estilo" value="Estilo musical da competição" />
        <select
          id="estilo"
          className="mt-1 block w-full text-gray-900"
          value={form.data.estilo}
          onChange={e => form.setData('estilo', e.currentTarget.value)}
        >
          <option>TODOS</option>
          <option>GOSPEL</option>
          <option>KUDURO</option>
          <option>RAP</option>
          <option>HOUSE</option>
          <option>SEMBA</option>
          <option>KIZOMBA</option>
        </select>
        <InputError message={form.errors.estilo} className="mt-2" />
      </div>
    </FormSection>
  );
}
