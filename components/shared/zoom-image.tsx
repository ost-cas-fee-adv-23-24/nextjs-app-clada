'use client';

import { FullscreenIcon } from 'clada-storybook';
import NextImage from 'next/image';
import React from 'react';

const ZoomImage = ({ src }: { src?: string }) => {
  return (
    src && (
      <div className='group relative h-auto w-full cursor-pointer overflow-hidden rounded-s'>
        <NextImage
          src={src}
          alt='post image'
          width={586}
          height={320}
          className='w-full scale-105 object-cover transition-all duration-300 ease-in-out group-hover:scale-100'
          style={{ aspectRatio: '586 / 320' }}
        />
        <div className='absolute inset-0 flex items-center justify-center bg-primary-500 bg-opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-30'>
          <div className='transform opacity-0 transition-opacity duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100'>
            <span className='inline-block text-white'>
              <FullscreenIcon color='white' size='l' />
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default ZoomImage;
