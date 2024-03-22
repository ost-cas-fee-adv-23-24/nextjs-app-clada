'use client';

import { CancelIcon, FullscreenIcon } from 'clada-storybook';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

const getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }

  return scrollbarWidth;
};

const toggleBodyScroll = (shouldPreventScroll: boolean) => {
  const scrollbarWidth = getScrollbarWidth();

  if (shouldPreventScroll) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
};

const ZoomImage = ({ src }: { src?: string }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    toggleBodyScroll(isPreviewOpen);
    return () => {
      toggleBodyScroll(false);
    };
  }, [isPreviewOpen]);

  return (
    <>
      {src && (
        <div
          className='group relative h-auto w-full cursor-pointer overflow-hidden rounded-s'
          onClick={() => setIsPreviewOpen(true)}
        >
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
      )}
      {isPreviewOpen && (
        <div
          className='fixed inset-0 z-50 cursor-pointer flex items-center justify-center bg-primary-500 bg-opacity-75'
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className='absolute top-0 right-0 m-m'>
            <CancelIcon color='white' size='m'></CancelIcon>
          </div>

          <div className='max-w-3xl max-h-full overflow-auto rounded-m'>
            <img
              src={src}
              alt='Expanded post image'
              className='block max-w-full max-h-full'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomImage;
