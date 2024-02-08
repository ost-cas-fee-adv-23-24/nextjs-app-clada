'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('zitadel')}
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
    >
      Login with Zitadel
    </button>
  );
}
