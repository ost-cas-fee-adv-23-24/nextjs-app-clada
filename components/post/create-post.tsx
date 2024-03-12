'use client';

import { CreatePost as createPost } from '@/app/api/actions/post.actions';
import { PostFrame } from './post-frame';
import { EyeIcon, Button, Textarea, SendIcon, Label } from 'clada-storybook';

export const CreatePost = ({
  showUser = true,
  placeholder = 'Deine Meinung zählt!',
  label = 'Hey, was gibts neues?',
  subtitle = '',
}: {
  showUser?: boolean;
  placeholder?: string;
  label?: string;
  subtitle?: string;
}) => {
  const create = async (formData: FormData) => {
    const result = await createPost(formData);
  };

  return (
    <PostFrame hasHover={false} showUser={showUser}>
      <form action={create}>
        {!subtitle ? (
          <Label size='xl' color='base'>
            {label}
          </Label>
        ) : (
          <div className='mb-font-h3'>{label}</div>
        )}
        <div className='pt-xxs'></div>

        <div className='mb-fon-paragraph-m color-primary-200'>{subtitle}</div>
        {subtitle && <div className='pt-s'></div>}
        <div className='pt-xs'></div>
        <Textarea id='text' name='text' placeholder={placeholder}></Textarea>
        <div className='pt-s'></div>
        <div className='flex'>
          <Button
            color='base'
            Icon={EyeIcon}
            label='Bild hochladen'
            size='m'
            onClick={() => false}
          ></Button>
          <div className='pr-s'></div>
          <Button
            color='primary'
            Icon={SendIcon}
            label='Absenden'
            size='m'
            onClick={() => false}
          ></Button>
        </div>
      </form>
    </PostFrame>
  );
};
