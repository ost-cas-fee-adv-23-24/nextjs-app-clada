'use client';

import { LogoutIcon } from 'clada-storybook';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    /*     <button
      onClick={() => signIn('zitadel')}
      className='rounded-l bg-primary-900 px-4 py-2 font-bold text-white hover:bg-blue-700'
    >
      Login
    </button> */

    <button onClick={() => signIn('zitadel')}>
      <div className='flex justify-center self-center'>
        <LogoutIcon color='white'></LogoutIcon>
      </div>
      <span className='text-white'>Login</span>
    </button>
  );
}
