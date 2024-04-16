'use client';

import { UpdateUser } from '@/app/api/actions/user.actions';
import {  User } from '@/utils/models';
import { Input, Modal, SettingsIcon } from 'clada-storybook';
import { useRef, useState } from 'react';
import {isError, ValidationError} from "@/utils/error";

export const SettingsModal = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  let formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] =
    useState<ValidationError | null>();

  const formAction = async (d: FormData) => {

    if(formRef.current) {
      const data = new FormData(formRef.current);
      console.log(data.get('username'))

      console.log(JSON.stringify(data))

      const response = await UpdateUser(data);

      if(response && isError(response)) {
        setFormState(response)
      } else {
        setFormState(null)
        setIsOpen(false)
      }
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
            error={formState?.errors['lastname'].join(' ')}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='firstname'
            name='firstname'
            type='text'
            label='Vorname'
            defaultValue={user.firstname}
            error={formState?.errors['firstname'].join(' ')}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='username'
            name='username'
            type='text'
            label='Benutzername'
            defaultValue={user.username}
            error={formState?.errors['username'].join(' ')}
          ></Input>
        </form>
      </Modal>
    </>
  );
};
