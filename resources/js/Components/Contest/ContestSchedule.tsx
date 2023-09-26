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
import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
interface Props {
  contestId: String;
}
export default function ContestSchedule({ contestId }: Props) {
  console.log(contestId);
  const form = useForm({
    _method: 'POST',
    id: '',
    inicio_inscricoes: '',
    inicio_votacoes: '',
    termino_inscricoes: '',
    termino_votacoes: '',
    url_schedule: null as File | null,
  });
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);

  function updateProfileInformation() {
    form.setData('id', contestId);
    form.post(route('add-contest-schedule'), {
      errorBag: 'contestCreationCoverFails',
      preserveScroll: true,
      onSuccess: () => {
        clearPhotoFileInput();
        setPhotoPreview('');
        Swal.fire({
          title: 'Bem salvo',
          text: 'Agenda salva.',
          icon: 'success',
          timer: 5000,
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

    form.setData('url_schedule', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function deletePhoto() {
    axios.post(route('add-schedule-contest'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
        Swal.fire({
          title: 'Informações bem salvas.',
          text: 'Parabéns sua agenda foi adicionada ao concurso, continue e salve o restante.',
          icon: 'success',
          timer: 3000,
        });
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('url_schedule', null);
    }
  }

  function submitForm() {}

  useEffect(() => {
    form.setData('id', contestId);
  }, [contestId]);
  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={'Calendário de execução'}
      description={`Crie uma imagem contendo todos os cronogramas e prazos da competição e adicione. Defina igualmente quando começam as inscrições e quando termina o concurso..`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Salvo.
          </ActionMessage>
          {contestId === '' || contestId === undefined || contestId === null ? (
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
        {/* <!-- Contest Schedule File Input --> */}
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
              className="block rounded w-20 h-20"
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
          Selecionar Imagem da Agenda
        </SecondaryButton>

        <InputError message={form.errors.url_schedule} className="mt-2" />
      </div>

      {/* <!-- Start Date --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="inicio_inscricoes" value="Início das inscrições" />
        <TextInput
          id="inicio_inscricoes"
          type="date"
          required
          className="mt-1 block w-full"
          value={form.data.inicio_inscricoes}
          onChange={e =>
            form.setData('inicio_inscricoes', e.currentTarget.value)
          }
          autoComplete="date"
        />
        <InputError message={form.errors.inicio_inscricoes} className="mt-2" />
      </div>

      {/* <!-- End Date --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel
          htmlFor="termino_inscricoes"
          value="Término das inscrições"
        />
        <TextInput
          id="termino_inscricoes"
          type="date"
          required
          className="mt-1 block w-full"
          value={form.data.termino_inscricoes}
          onChange={e =>
            form.setData('termino_inscricoes', e.currentTarget.value)
          }
        />
        <InputError message={form.errors.termino_inscricoes} className="mt-2" />
      </div>

      {/* <!-- Start Date --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="inicio_votacoes" value="Início das votações" />
        <TextInput
          id="inicio_votacoes"
          type="date"
          required
          className="mt-1 block w-full"
          value={form.data.inicio_votacoes}
          onChange={e => form.setData('inicio_votacoes', e.currentTarget.value)}
          autoComplete="date"
        />
        <InputError message={form.errors.inicio_votacoes} className="mt-2" />
      </div>

      {/* <!-- End Date --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="termino_votacoes" value="Término das votações" />
        <TextInput
          id="termino_votacoes"
          type="date"
          required
          className="mt-1 block w-full"
          value={form.data.termino_votacoes}
          onChange={e =>
            form.setData('termino_votacoes', e.currentTarget.value)
          }
        />
        <InputError message={form.errors.termino_votacoes} className="mt-2" />
      </div>
    </FormSection>
  );
}
