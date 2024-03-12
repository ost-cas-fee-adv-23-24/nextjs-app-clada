// import { Logo, SettingsIcon } from 'clada-storybook';
import LoginButton from '../login-button';
import { UserImage } from '../shared/user-image';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LogoutButton from '../logout-button';
import { LogO } from './logo';

export const Header = async () => {
  const session = await auth();
  console.log(session)

  return (
    <header className='fixed z-10 flex max-h-header w-full place-content-center bg-primary-700 p-s'>
      <div className='flex max-w-[680px] flex-grow'>
        <div className='flex flex-grow'>
          <div className='scale-60'>
            <LogO />
          </div>
          <div className='ml-auto flex pt-xxs'>
            <UserImage size='s'></UserImage>
            <div className='ml-l mr-l flex-col'>
              <div className='flex justify-center self-center'>
                {/* <SettingsIcon color='white'></SettingsIcon> */}
              </div>
              <span className='text-white'>Settings</span>
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
