'use client';

import { UpdateUser } from '@/actions/user.actions';
import { ValidationError, isError } from '@/utils/error';
import { User } from '@/utils/models';
import { Input, Modal, SettingsIcon } from 'clada-storybook';
import { useRef, useState } from 'react';

export const SettingsModal = ({
  user,
  color = 'white',
  showText = true,
}: {
  user: User;
  color?: 'white' | 'primary';
  showText?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<ValidationError | null>();

  const formAction = async (d: FormData) => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      const response = await UpdateUser(data);

      if (response && isError(response)) {
        setFormState(response);
      } else {
        setFormState(null);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} aria-label='Settings'>
        <div className='flex justify-center self-center'>
          <SettingsIcon color={color}></SettingsIcon>
        </div>
        {showText && <span className='text-white'>Settings</span>}
      </button>
      <Modal
        title='Einstellungen'
        width='m'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => formRef?.current?.requestSubmit()}
      >
        <form ref={formRef} action={formAction}>
          <Input
            id='lastname'
            name='lastname'
            type='text'
            label='Name'
            defaultValue={user.lastname}
            error={formState?.errors['lastname']?.join(' ')}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='firstname'
            name='firstname'
            type='text'
            label='Vorname'
            defaultValue={user.firstname}
            error={formState?.errors['firstname']?.join(' ')}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='username'
            name='username'
            type='text'
            label='Benutzername'
            defaultValue={user.username}
            error={formState?.errors['username']?.join(' ')}
          ></Input>
        </form>
      </Modal>
    </>
  );
};
