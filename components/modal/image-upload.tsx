'use client';

import { Button, UploadIcon } from 'clada-storybook';
import { useEffect, useRef, useState } from 'react';
import { ModalWindow } from './modal';

export const ImageUpload = ({
  isShown = false,
  onClose: handleClose,
}: {
  isShown: boolean;
  onClose: (file?: File, imgSrc?: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImgFile(file);
        setImgSrc(URL.createObjectURL(file));
      }
    }
  };

  const addDragListeners = () => {
    const dropArea = dropAreaRef.current;

    dropArea?.addEventListener('dragover', handleDragOver);
    dropArea?.addEventListener('drop', handleDrop);
  };

  const removeDragListeners = () => {
    const dropArea = dropAreaRef.current;

    dropArea?.removeEventListener('dragover', handleDragOver);
    dropArea?.removeEventListener('drop', handleDrop);
  };

  useEffect(() => {
    if (!isShown) {
      handleClose?.();
      removeDragListeners();
    } else {
      setImgSrc('');
      setImgFile(undefined);

      setTimeout(addDragListeners, 300);
    }

    setIsOpen(isShown);
  }, [isShown]);

  const onClose = () => {
    setImgFile(undefined);
    setImgSrc('');
    handleClose?.();
  };

  const onSubmit = () => {
    handleClose?.(imgFile, imgSrc);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImgFile(file);
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <ModalWindow
        title='Bild hochladen'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/jpeg,image/png'
          onChange={handleFileChange}
          hidden
        />

        <div
          ref={dropAreaRef}
          className='w-full flex-col max-w-[560px] h-[228px] rounded-m bg-base-100  border-base-200 border-2 border-dashed  overflow-hidden flex items-center justify-center'
          style={!imgSrc ? {} : { display: 'none' }}
        >
          <div>
            <UploadIcon size='l'></UploadIcon>
          </div>
          <div className='mb-font-paragraph-l text-base-600'>
            Datei hierhin ziehen ...
          </div>
          <div className='mb-font-paragraph-m text-base-400'>
            JPEG oder PNG, maximal 50 MB
          </div>
        </div>

        {imgSrc && (
          <div className='relative w-full flex-col max-w-[560px] h-[228px] rounded-m overflow-hidden'>
            <img
              className='absolute w-full h-full object-cover object-center'
              src={imgSrc}
              alt='Selected Image'
            />
          </div>
        )}

        <div className='pt-s'></div>
        <Button
          size='m'
          color='base'
          Icon={UploadIcon}
          label='... oder Datei auswählen'
          onClick={handleFileSelectClick}
        ></Button>
      </ModalWindow>
    </>
  );
};
