'use client';

import { Logo } from 'clada-storybook';
import LoginButton from '../login-button';

export const Header = () => {
  return (
    <header className='p-s bg-primary-700 max-h-header fixed flex w-full place-content-center'>
      <div className='w-content flex justify-between'>
        <Logo variant='white' href='/'></Logo>
        <LoginButton></LoginButton>
      </div>
    </header>
  );
};
