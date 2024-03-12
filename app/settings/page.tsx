import React from 'react';
import { auth } from '../api/auth/[...nextauth]/auth';
import { Settings } from '@/components/modal/settings';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Settings></Settings>
    </div>
  );
}
