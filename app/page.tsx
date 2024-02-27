import { auth } from './api/auth/[...nextauth]/auth';
import React from 'react';
import { GetUsers } from './api/actions/user.actions';
export default async function Home() {
  const session = await auth();
  const users = await GetUsers()

  return (
    <div>
      <h1 className='mb-font-h2 text-primary-600'>Welcome to the Mumble!</h1>
      <h2 className='mb-font-h4 text-base-500'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </h2>

      <div className='pt-l'></div>

      <div className='mb-font-label-xl rounded-m p-l h-screen w-full bg-white'>
        Content Placeholder
      </div>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}
