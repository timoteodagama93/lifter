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
import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

interface Props {
  contest: Object;
}
export default function ContestWinners({ contest }: Props) {
  const form = useForm({
    _method: 'POST',
    id: contest.id,
    total_premios: contest?.total_premios,
    lugar_1: contest?.lugar_1,
    lugar_2: contest?.lugar_2,
    lugar_3: contest?.lugar_3,
    premios_extras: contest?.premios_extras,
    numero_vencedores: contest.numero_vencedores,
    tipo_premio: contest.tipo_premio,
    photo: null as File | null,
  });
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState<string | null>(contest.url_beneficios);
  const photoRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);

  function updateProfileInformation() {
    form.post(route('add-contest-premios'), {
      errorBag: 'contestCreationCoverFails',
      preserveScroll: true,
      onSuccess: () => {
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

    form.setData('photo', photo);

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
      form.setData('photo', null);
    }
  }

  function submitForm() {}
  useEffect(() => {
    form.setData('id', contest);
  }, [contest]);

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={'Prémios e benefícios'}
      description={`Adicione uma imagem contendo todos os benefícios da competição. Adicione o tipo de prémio, adicione o número de vencedores.`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Salvo.
          </ActionMessage>
          {contest === '' || contest === undefined || contest === null ? (
            <ActionMessage on={true} className="mr-3">
              Salve as informações básicas para adicionar o calendário
            </ActionMessage>
          ) : (
            <PrimaryButton
              className={classNames({ 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              Salvar
            </PrimaryButton>
          )}
        </>
      )}
    >
      <div className="col-span-6 sm:col-span-4">
        {/* <!-- Profile Photo File Input --> */}
        <input
          type="file"
          className="hidden"
          ref={photoRef}
          onChange={updatePhotoPreview}
        />

        <InputLabel htmlFor="photo" value="Photo" />

        {photoPreview ? (
          // <!-- New Profile Photo Preview -->
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
        <InputError message={form.errors.photo} className="mt-2" />
      </div>

      {/* <!-- Total de premios --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="total_premios" value="Total de premio" />
        <TextInput
          id="total_premios"
          type="number"
          min={1}
          className="mt-1 block w-full"
          value={form.data.total_premios}
          onChange={e =>
            form.setData(
              'total_premios',
              Number.parseInt(e.currentTarget.value),
            )
          }
        />
        <InputError message={form.errors.total_premios} className="mt-2" />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="lugar_1" value="1º Lugar" />
        <TextInput
          id="lugar_1"
          type="number"
          min={1}
          className="mt-1 block w-full"
          value={form.data.lugar_1}
          onChange={e =>
            form.setData('lugar_1', Number.parseInt(e.currentTarget.value))
          }
        />
        <InputError message={form.errors.lugar_1} className="mt-2" />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="lugar_2" value="2º Lugar" />
        <TextInput
          id="lugar_3"
          type="number"
          min={1}
          className="mt-1 block w-full"
          value={form.data.lugar_2}
          onChange={e =>
            form.setData('lugar_2', Number.parseInt(e.currentTarget.value))
          }
        />
        <InputError message={form.errors.lugar_2} className="mt-2" />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="lugar_3" value="3º Lugar" />
        <TextInput
          id="lugar_3"
          type="number"
          min={1}
          className="mt-1 block w-full"
          value={form.data.lugar_3}
          onChange={e =>
            form.setData('lugar_3', Number.parseInt(e.currentTarget.value))
          }
        />
        <InputError message={form.errors.lugar_3} className="mt-2" />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputLabel
          htmlFor="premios_extras"
          value="Prémios extras, separe com pontos e vírgulas"
        />
        <TextInput
          id="premios_extras"
          type="text"
          min={1}
          className="mt-1 block w-full"
          value={form.data.premios_extras}
          onChange={e => form.setData('premios_extras', e.currentTarget.value)}
        />
        <InputError message={form.errors.lugar_3} className="mt-2" />
      </div>

      {/* <!-- Numero de vencedores --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Número de vencedores" />
        <TextInput
          id="name"
          type="number"
          min={1}
          className="mt-1 block w-full"
          value={form.data.numero_vencedores}
          onChange={e =>
            form.setData(
              'numero_vencedores',
              Number.parseInt(e.currentTarget.value),
            )
          }
          autoComplete="name"
        />
        <InputError message={form.errors.numero_vencedores} className="mt-2" />
      </div>

      {/* <!-- Tipo de prémios --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="tipo_premio" value="Tipo de prémios" />
        <select
          id="tipo_pr emio"
          className="mt-1 block w-full text-gray-900"
          value={form.data.tipo_premio}
          onChange={e => form.setData('tipo_premio', e.currentTarget.value)}
        >
          <option>Dinheiro</option>
          <option>Medalhas</option>
          <option>Trofeus</option>
          <option>Patrocínios</option>
          <option>Marketing</option>
          <option>Financiamento</option>
        </select>
        <InputError message={form.errors.tipo_premio} className="mt-2" />
      </div>
    </FormSection>
  );
}
