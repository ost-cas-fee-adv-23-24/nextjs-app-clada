import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { ServiceWorker } from '@/components/layout/service-worker';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Header />
      <ServiceWorker />
      <div className='pt-l'></div>
      <main className='grid w-full min-h-screen place-items-center items-start bg-base-100 py-xl pl-l pr-l pt-header'>
        <div className='flex max-w-[680px] w-full'>{children}</div>
        <Footer />
      </main>
    </SessionProvider>
  );
};
