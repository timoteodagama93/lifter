import React, { PropsWithChildren } from 'react';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-[#f6cc33] to-[#f6cc33] border-t-8 border-[#005792]   ">
      <div>
        <AuthenticationCardLogo />
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
