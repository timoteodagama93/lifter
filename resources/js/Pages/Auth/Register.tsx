import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import RestCountries from '@/Components/RestCountries';

import { countries } from 'countries-list';
const paises = [...Object.values(countries)];

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const [countryIndex, setCountryIndex] = useState(0);

  const form = useForm({
    name: '',
    phone: '',
    country: paises[7].name + ':' + paises[7].phone,
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Register" />

      <form onSubmit={onSubmit}>
        <div className="mt-4  w-full ">
          <InputLabel htmlFor="phone">País </InputLabel>

          <select
            name="code"
            id="code"
            defaultValue={paises[8].name}
            onChange={e => {
              setCountryIndex(Number.parseInt(e.currentTarget.value));
              form.setData(
                'country',
                paises[countryIndex].name + ':' + paises[countryIndex].phone,
              );
            }}
          >
            {paises.map(country => (
              <option value={country.name + ':' + country.phone}>
                {country.name}
              </option>
            ))}
          </select>
          <InputError className="mt-2" message={form.errors.phone} />
        </div>
        <div>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            onChange={e => form.setData('name', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="name"
          />
          <InputError className="mt-2" message={form.errors.name} />
        </div>

        <div className="mt-4  w-full ">
          <InputLabel htmlFor="phone">Nº de telefone</InputLabel>
          <div className="flex  w-full ">
            <TextInput
              id="phone"
              type="tel"
              className="mt-1 block w-full "
              value={form.data.phone}
              onChange={e => form.setData('phone', e.currentTarget.value)}
              required
            />
          </div>
          <InputError className="mt-2" message={form.errors.phone} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">Senha</InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation">
            Confirmar Senha
          </InputLabel>
          <TextInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={e => {
              form.setData('password_confirmation', e.currentTarget.value);
            }}
            required
            autoComplete="new-password"
          />
          {form.data.password != form.data.password_confirmation ? (
            <InputError className="mt-2" message="As senhas não coincidem" />
          ) : (
            ''
          )}

          <InputError
            className="mt-2"
            message={form.errors.password_confirmation}
          />
        </div>

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <InputLabel htmlFor="terms">
              <div className="flex items-center">
                <Checkbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={e => form.setData('terms', e.currentTarget.checked)}
                  required
                />

                <div className="ml-2">
                  Concordo com os{' '}
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Termos de serviços
                  </a>{' '}
                  e{' '}
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Politicas de privacidade
                  </a>
                </div>
              </div>
              <InputError className="mt-2" message={form.errors.terms} />
            </InputLabel>
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Já tem uma conta?
          </Link>

          <PrimaryButton
            className={classNames('ml-4', {
              'opacity-25':
                form.processing ||
                form.data.password != form.data.password_confirmation,
            })}
            disabled={
              form.processing ||
              form.data.password != form.data.password_confirmation
            }
          >
            Continuar
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
