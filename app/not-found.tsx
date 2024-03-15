'use client';

import { Button, Link } from 'clada-storybook';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section>
      <div>
        <Image
          src='/not-found.jpeg'
          alt='404'
          width={300}
          height={300}
          className='mx-auto'
        />
      </div>

      <div>
        <Link href='/'>Versuchen wir es erneut!</Link>
      </div>
    </section>
  );
}
