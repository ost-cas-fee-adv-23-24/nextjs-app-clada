'use client';

import { LogoutIcon } from 'clada-storybook';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('zitadel')}
      data-testid='login-button'
      aria-label='Login'
    >
      <div className='flex justify-center self-center'>
        <LogoutIcon color='white'></LogoutIcon>
      </div>
      <span className='text-white'>Login</span>
    </button>
  );
}
