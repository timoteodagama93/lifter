import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'));
  }

  return (
    <AuthenticationCard>
      <Head title="Email Verification" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Antes de continuar, você precisa verificar seu endereço de email é só
        clicar no link que acabámos de enviar para você no seu email! Se você
        não recebeu o email, nós iremos enviar-lhe outro.
      </div>

      {verificationLinkSent && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          Um novo link de verificação foi enviado para o endereço de email que
          você digitou durante o registro.
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mt-4 flex items-center justify-between">
          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Reenviar email de verificação
          </PrimaryButton>

          <div>
            <Link
              href={route('profile.show')}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Editar Perfil
            </Link>
          </div>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ml-2"
          >
            Terminar Sessão
          </Link>
        </div>
      </form>
    </AuthenticationCard>
  );
}
