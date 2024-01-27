import { Link } from '@inertiajs/react';
import React from 'react';
import logo from '../../img/logo.png';
import ApplicationLogo from './ApplicationLogo';

export default function AuthenticationCardLogo() {
  return (
    <Link href="/">
      <div className="w-full justify-center flex flex-row">
        <img width="400px" className="" src={logo} />
      </div>
    </Link>
  );
}
