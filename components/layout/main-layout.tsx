import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Header } from './header';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Header />
      <div className='pt-l'></div>
      <main className='grid w-full min-h-screen place-items-center items-start bg-base-100 py-xl pl-l pr-l pt-header'>
        <div className='flex max-w-[680px] w-full'>{children}</div>
      </main>
    </SessionProvider>
  );
};
