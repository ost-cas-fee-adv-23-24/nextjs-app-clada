'use client';

import { Input, Label, SettingsIcon, Textarea } from 'clada-storybook';
import { useState } from 'react';
import { ModalWindow } from './modal';

export const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    alert('settings closed');
  };

  const onSubmit = () => {
    alert('settings submitted');
    setIsOpen(false);
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
        onSubmit={onSubmit}
      >
        <Input
          id='name'
          type='text'
          label='Name Vorname'
          placeholder='Hans Muster'
        ></Input>
        <div className='pb-m'></div>
        <Input
          id='mail'
          type='mail'
          label='Email Adresse'
          placeholder='hans.muster@mail.com'
        ></Input>
        <div className='pb-m'></div>
        <Input
          id='location'
          type='text'
          label='Ortschaft'
          placeholder='Ortschaft'
        ></Input>
        <div className='pb-s'></div>
        <Label size='s' color='base'>
          Biografie
        </Label>
        <Textarea
          id='biography'
          name='biography'
          placeholder='Biografie'
        ></Textarea>
        <div className='pb-l'></div>
        <Label size='xl' color='base'>
          Passwort ändern
        </Label>
        <div className='pb-s'></div>
        <Input id='old-password' type='password' label='Altes Passwort'></Input>
        <div className='pb-m'></div>
        <Input id='new-password' type='password' label='Neues Passwort'></Input>
      </ModalWindow>
    </>
  );
};
