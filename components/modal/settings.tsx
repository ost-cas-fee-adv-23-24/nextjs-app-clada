'use client';

import { UpdateUser } from '@/app/api/actions/user.actions';
import { UpdateUserData, User } from '@/utils/models';
import { Input, Modal, SettingsIcon } from 'clada-storybook';
import { FormEvent, useRef, useState } from 'react';

export const SettingsModal = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  let formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] =
    useState<Awaited<ReturnType<typeof UpdateUser>>>();

  const formAction = async (event: FormData) => {
    // event.preventDefault();

    // console.log(new FormData())

    // console.log(new FormData(event.target as HTMLFormElemen))

    if(formRef.current) {
      const data = new FormData(formRef.current)
      console.log(data.get('username'))
    }

    console.log(formRef.current)
    console.log(event);

    // if (user) {
    //   const result = await UpdateUser({
    //     firstname: formData.get('firstname') as string,
    //     lastname: formData.get('lastname') as string,
    //     username: formData.get('username') as string,
    //   } as UpdateUserData);

    //   setFormState(result);

    //   if (!result?.errors) {
    //     setIsOpen(false);
    //   }
    // }
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
            id='name'
            type='text'
            label='Name'
            defaultValue={user.lastname}
            error={formState?.errors?.lastname?.[0]}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='firstname'
            type='text'
            label='Vorname'
            defaultValue={user.firstname}
            error={formState?.errors?.firstname?.[0]}
          ></Input>
          <div className='pb-l'></div>
          <Input
            id='username'
            type='text'
            label='Benutzername'
            defaultValue={user.username}
            error={formState?.errors?.username?.[0]}
          ></Input>
        </form>
      </Modal>
    </>
  );
};
