import { MumbleLogo } from '@/components/layout/header/logo';
import { HeaderUserActions } from '@/components/layout/header/user-actions';

export const Header = () => {
  return (
    <header className='fixed z-30 flex max-h-header w-full place-content-center bg-primary-700 p-s'>
      <div className='flex max-w-[680px] flex-grow'>
        <nav className='flex flex-grow'>
          <div className='scale-60'>
            <MumbleLogo aria-label='Home' />
          </div>
          <HeaderUserActions />
        </nav>
      </div>
    </header>
  );
};
