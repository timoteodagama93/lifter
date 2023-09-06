import React, { useState } from 'react';
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

export default function RegisterArtist({ artist }) {
  const page = useTypedPage();
  const route = useRoute();
  const [souMusico, setSouMusico] = useState(false);
  const formArtist = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  const formUser = useForm({
    verify_if_artist: false,
  });

  function onSubmitUserForm(e: React.FormEvent) {
    e.preventDefault();
    formUser.post('/', {
      onSuccess: data => {
        //  router.get('/');
        page.props.auth.user.verify_if_artis = false;
      },
      onFinish: data => {
        page.props.auth.user.verify_if_artis = false;
      },
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formArtist.post(route('register'), {
      onFinish: () => formArtist.reset('password', 'password_confirmation'),
    });
  }

  function updatePassword() {
    formUser.put(route('user-is-arrtist'), {
      errorBag: 'updateNotArtist',
      preserveScroll: true,
      onSuccess: () => router.get('/'),
      onError: () => {
        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Register" />

      {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
        <div className="mt-4 w-full text-xl flex justify-center items-center">
          <InputLabel htmlFor="terms">
            <div className="flex items-center">
              <Checkbox
                name="sou_musico"
                id="sou_musico"
                onChange={e => setSouMusico(e.currentTarget.checked)}
                required
              />
              <div className="ml-2">Eu sou músico</div>
            </div>

            <InputError className="mt-2" message={formArtist.errors.terms} />
          </InputLabel>
        </div>
      )}

      <SectionBorder></SectionBorder>
      {souMusico === true ? (
        <form onSubmit={onSubmit}>
          <div>
            <InputLabel htmlFor="name">Nome Artísticco</InputLabel>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={formArtist.data.name}
              onChange={e => formArtist.setData('name', e.currentTarget.value)}
              required
              autoFocus
              autoComplete="name"
            />
            <InputError className="mt-2" message={formArtist.errors.name} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={formArtist.data.email}
              onChange={e => formArtist.setData('email', e.currentTarget.value)}
              required
            />
            <InputError className="mt-2" message={formArtist.errors.email} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <TextInput
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={formArtist.data.password}
              onChange={e =>
                formArtist.setData('password', e.currentTarget.value)
              }
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2" message={formArtist.errors.password} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation">
              Confirmar Senha
            </InputLabel>
            <TextInput
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full"
              value={formArtist.data.password_confirmation}
              onChange={e =>
                formArtist.setData(
                  'password_confirmation',
                  e.currentTarget.value,
                )
              }
              required
              autoComplete="new-password"
            />
            <InputError
              className="mt-2"
              message={formArtist.errors.password_confirmation}
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route('login')}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Já tem uma conta?
            </Link>

            <PrimaryButton
              className={classNames('ml-4', {
                'opacity-25': formArtist.processing,
              })}
              disabled={formArtist.processing}
            >
              Continuar
            </PrimaryButton>
          </div>
        </form>
      ) : (
        <>
          <form onSubmit={onSubmitUserForm}>
            <InputLabel htmlFor="terms">
              <div className="flex justify-normal items-start">
                <div className="ml-2 flex">
                  Se não é músico, convidamo-lo a ser um membro do grande júri,
                  contamos consigo na diversão avaliando novos talentos,
                  deixando sua opinião para os artistas. Descubra e partilhe as
                  músicas que gostar e promova uma nova cultura. Faça da Lifter
                  um local para descoberta de novas emoções, novas músicas e
                  hits.
                </div>
              </div>
              <InputError className="mt-2" message={formArtist.errors.terms} />
            </InputLabel>
            <div className="w-full flex justify-center items-center">
              <PrimaryButton
                className={classNames('mt-4 ml-4')}
                disabled={formUser.processing}
              >
                Continuar
              </PrimaryButton>
            </div>
          </form>
        </>
      )}
    </AuthenticationCard>
  );
}
