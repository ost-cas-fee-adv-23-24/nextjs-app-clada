import { auth } from './api/auth/[...nextauth]/auth';
import React from 'react';
import { GetUsers } from './api/actions/user.actions';
export default async function Home() {
  const session = await auth();
  const users = await GetUsers();

  return (
    <div>
      <h1 className='text-primary-600 mb-font-h2'>Welcome to the Mumble!</h1>
      <h2 className='text-base-500 mb-font-h4'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </h2>

      <div className='pt-l'></div>

      <div className='h-screen w-full rounded-m bg-white p-l mb-font-label-xl'>
        Content Placeholder
      </div>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}
