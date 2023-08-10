import { Link } from '@inertiajs/react';
import React from 'react';
import smal_logo from '../../img/z00.png';
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
