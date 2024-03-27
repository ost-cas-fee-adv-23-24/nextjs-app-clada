'use client';

import { Input, Label, SettingsIcon, Textarea } from 'clada-storybook';
import { FormEvent, SyntheticEvent, useRef, useState } from 'react';
import { ModalWindow } from './modal';
import { UpdateUserData, User } from '@/utils/models';
import { UpdateUser } from '@/app/api/actions/user.actions';

export const SettingsModal = ({ user }: {user: User}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  console.log(user)

  const onClose = () => {
    setIsOpen(false);
  };

  const formAction = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      console.log('FD', formData)

      // await UpdateUser(formData);
      // formRef.current.reset();
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <div className='flex justify-center self-center'>
          <SettingsIcon color='white'></SettingsIcon>
        </div>
        <span className='text-white'>Settings</span>
      </button>
      <ModalWindow
        title='Einstellungen'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={() => formRef?.current?.requestSubmit()}
      >
        <form ref={formRef} onSubmit={formAction}>
          <Input
            id='lastname'
            type='text'
            label='Name'
            defaultValue={user.lastname}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='firstname'
            type='text'
            label='Vorname'
            defaultValue={user.firstname}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='username'
            type='text'
            label='Benutzername'
            defaultValue={user.username}
          ></Input>
        </form>
      </ModalWindow>
    </>
  );
};
