// import { Logo, SettingsIcon } from 'clada-storybook';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LoginButton from '../shared/button/login-button';
import LogoutButton from '../shared/button/logout-button';
import SettingsButton from '../shared/button/settings-button';
import { UserImage } from '../shared/user-image';
import { LogO } from './logo';

export const Header = async () => {
  const session = await auth();

  return (
    <header className='fixed z-50 flex max-h-header w-full place-content-center bg-primary-700 p-s'>
      <div className='flex max-w-[680px] flex-grow'>
        <div className='flex flex-grow'>
          <LogO />
          <div className='ml-auto flex pt-xxs'>
            <UserImage size='s'></UserImage>
            <div className='ml-l mr-l flex-col'>
              <SettingsButton />
            </div>{' '}
            <div className='flex-col'>
              {session ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
