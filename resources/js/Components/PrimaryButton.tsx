import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function PrimaryButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  const [isPulsating, setPulsating] = useState(false);

  const handleClick = () => {
    // Ative a animação de pulsação
    setPulsating(true);

    // Desative a animação após um curto período de tempo
    setTimeout(() => {
      setPulsating(false);
    }, 300);
  };
  const buttonClass = isPulsating ? 'pulsating' : '';
  return (
    <button
      {...props}
      className={`pulsating-button ${buttonClass} classNames(
        'inline-flex items-center px-4 py-2 bg-red-700 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-red-900 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150
        ${props.className},
        `}
    >
      {children}
    </button>
  );
}
