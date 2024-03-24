'use client';

import { Button, EyeIcon, SendIcon, Textarea } from 'clada-storybook';

export const CreateContent = () => {
  return (
    <div>
      <div className='pt-s' />
      <Textarea id='text' name='text' placeholder='Und was meinst du dazu?' />
      <div className='pt-s' />
      <div className='flex'>
        <Button
          color='base'
          Icon={EyeIcon}
          label='Bild hochladen'
          onClick={() => false}
          size={'m'}
        />
        <div className='pr-s' />
        <Button
          color='primary'
          Icon={SendIcon}
          label='Absenden'
          size='m'
          onClick={() => true}
        ></Button>
      </div>
    </div>
  );
};
