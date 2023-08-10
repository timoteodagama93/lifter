import React from 'react';
import logo from '../../img/logo.png';

export default function ApplicationLogo({ className }: { className?: string }) {
  return (
    <div className="w-full justify-center flex flex-row">
      <img className={`${className}`} src={logo} />
    </div>
  );
}
