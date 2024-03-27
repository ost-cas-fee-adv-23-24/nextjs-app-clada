'use client';

import { Modal } from 'clada-storybook';
import { FormEvent, RefObject, useEffect, useState } from 'react';

export const ModalWindow = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) => {
  const [isClosed, setIsClosed] = useState(!isOpen);

  useEffect(() => {
    setIsClosed(!isOpen);
  }, [isOpen]);

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      width='m'
      onClose={onClose}
      onSubmit={onSubmit}
    >
      {children}
    </Modal>
  );
};
