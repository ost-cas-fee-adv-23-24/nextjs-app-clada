import { ReactNode } from 'react';
import { Header } from './header';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <body className='h-full w-full'>
      <Header />
      <div className='pt-l'></div>
      <main className='bg-base-100 py-xl pl-l pt-header pr-s grid w-full place-items-center items-start'>
        <div className='w-content flex'>{children}</div>
      </main>
    </body>
  );
};
