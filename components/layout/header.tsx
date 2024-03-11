'use client';

import { Logo, LogoutIcon, SettingsIcon } from 'clada-storybook';
import LoginButton from '../login-button';
import { UserImage } from '../shared/user-image';

export const Header = () => {
  return (
    <header className='fixed z-10 flex max-h-header w-full place-content-center bg-primary-700 p-s'>
      <div className='flex max-w-[680px] flex-grow'>
        <div className='flex flex-grow'>
          <div className='scale-60'>
            <Logo variant='white' href='/'></Logo>
          </div>
          <div className='ml-auto flex pt-xxs'>
            <UserImage size='s'></UserImage>

            <div className='ml-l mr-l flex-col'>
              <div className='flex justify-center self-center'>
                <SettingsIcon color='white'></SettingsIcon>
              </div>
              <span className='text-white'>Settings</span>
            </div>

            <div className='flex-col'>
              <LoginButton></LoginButton>
            </div>
            {/* 
            <div>
              <LoginButton></LoginButton>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};
