import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function PulseButton({
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
      className={`pulsating-button ${buttonClass} 
        ${props.className},
        `}
    >
      {children}
    </button>
  );
}
