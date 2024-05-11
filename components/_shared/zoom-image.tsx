import { CancelIcon, FullscreenIcon } from 'clada-storybook';
import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const cancelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLDivElement>(null);

  const closePreview = () => {
    setIsPreviewOpen(false);
    openerRef.current?.focus(); // Focus is restored to the image that opened the modal
  };

  useEffect(() => {
    toggleBodyScroll(isPreviewOpen);

    if (isPreviewOpen) {
      cancelRef.current?.focus();
    }

    return () => {
      toggleBodyScroll(false);
    };
  }, [isPreviewOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPreviewOpen) {
        closePreview();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  return (
    <>
      {src && (
        <div
          ref={openerRef}
          className='group relative h-auto w-full cursor-pointer overflow-hidden rounded-s'
          onClick={() => setIsPreviewOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsPreviewOpen(true)}
          tabIndex={0}
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
      {isPreviewOpen && src && (
        <div
          className='fixed inset-0 z-50 cursor-pointer flex items-center justify-center bg-primary-500 bg-opacity-75'
          onClick={closePreview}
        >
          <div
            className='absolute top-0 right-0 m-4 focus-white'
            onKeyDown={(e) => e.key === 'Enter' && closePreview()}
            tabIndex={0}
            ref={cancelRef}
          >
            <CancelIcon color='white' size='m' />
          </div>

          <div className='bg-white rounded-lg overflow-hidden rounded-m max-w-[90%] max-h-[90%] md:max-w-[80%] md:max-h-[80%]'>
            <NextImage
              src={src}
              alt='Expanded post image'
              layout='responsive'
              width={800}
              height={450}
              className='block mx-auto'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomImage;
