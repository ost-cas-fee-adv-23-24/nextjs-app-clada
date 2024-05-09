import { MumbleLogo } from '@/components/header/logo';
import { HeaderUserActions } from '@/components/header/user-actions';

export const Header = async () => {
  return (
    <header className='fixed z-10 flex max-h-header w-full place-content-center bg-primary-700 p-s'>
      <div className='flex max-w-[680px] flex-grow'>
        <div className='flex flex-grow'>
          <div className='scale-60'>
            <MumbleLogo />
          </div>
          <HeaderUserActions />
        </div>
      </div>
    </header>
  );
};
