'use client';

import { Button, EyeIcon } from 'clada-storybook';
import { useEffect, useState } from 'react';
import { ModalWindow } from './modal';

export const ImageUpload = ({
  isShown = false,
  onClose: handleClose,
}: {
  isShown: boolean;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isShown) {
      handleClose?.();
    }

    setIsOpen(isShown);
  }, [isShown]);

  const onClose = () => {
    handleClose?.();
  };

  const onSubmit = () => {
    handleClose?.();
  };

  return (
    <ModalWindow
      title='Bild hochladen'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className='w-full flex-col max-w-[560px] h-[192px] rounded-m bg-base-100  border-base-200 border-2 border-dashed  overflow-hidden flex items-center justify-center'>
        <div>
          <EyeIcon size='l'></EyeIcon>
        </div>
        <div className='mb-font-paragraph-l text-base-600'>
          Datei hierhin ziehen ...
        </div>
        <div className='mb-font-paragraph-m text-base-400'>
          JPEG oder PNG, maximal 50 MB
        </div>
      </div>
      <div className='pt-s'></div>
      <Button
        size='m'
        color='base'
        Icon={EyeIcon}
        label='... oder Datei auswählen'
        onClick={() => alert('datei auswählen...')}
      ></Button>
    </ModalWindow>
  );
};
