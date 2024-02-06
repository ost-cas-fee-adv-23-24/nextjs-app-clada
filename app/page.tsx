import LoginButton from '@/components/login-button';
import { auth } from './api/auth/[...nextauth]/auth';
import React from 'react';
import LogoutButton from '@/components/logout-button';
export default async function Home() {
  const session = await auth();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {!!session ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <LoginButton />
          </div>
        </div>
      )}
    </main>
  );
}
