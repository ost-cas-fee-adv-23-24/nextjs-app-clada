'use client';

import { LogoutIcon } from 'clada-storybook';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()} data-testid='logout-button' aria-label='Logout'>
      <div className='flex justify-center self-center'>
        <LogoutIcon color='white'></LogoutIcon>
      </div>
      <span className='text-white'>Logout</span>
    </button>
  );
}
