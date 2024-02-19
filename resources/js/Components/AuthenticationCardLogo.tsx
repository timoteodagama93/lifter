import { Link } from '@inertiajs/react';
import React from 'react';
import logo from '../../img/logo.png';
import ApplicationLogo from './ApplicationLogo';

export default function AuthenticationCardLogo() {
  return (
    <Link href="/">
      <div className="w-full justify-center flex flex-row">
        <img  className="w-[400px] h-full" src={logo} />
      </div>
    </Link>
  );
}
