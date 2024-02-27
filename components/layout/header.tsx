'use client';

import { Logo } from 'clada-storybook';
import LoginButton from '../login-button';

export const Header = () => {
  return (
    <header className='fixed z-10 flex max-h-header w-full place-content-center bg-primary-700 p-s'>
      <div className='flex max-w-2xl flex-grow justify-between'>
        <Logo variant='white' href='/'></Logo>
        <LoginButton></LoginButton>
      </div>
    </header>
  );
};
