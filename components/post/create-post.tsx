'use client';

import { CreatePost as createPost } from '@/app/api/actions/post.actions';
import { Button, EyeIcon, Label, SendIcon, Textarea } from 'clada-storybook';
import { useRef, useState } from 'react';
import { ImageUpload } from '../modal/image-upload';
import { PostFrame } from './post-frame';

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
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      await createPost(formData);
      formRef.current.reset();
    }
  };

  const uploadImage = (event?: React.MouseEvent) => {
    console.log(event);

    event?.preventDefault();
    setIsOpen(true);
  };

  const handleCloseImageUpload = () => {
    setIsOpen(false);
  };

  return (
    <>
      <PostFrame hasHover={false} showUser={showUser}>
        <form ref={formRef} onSubmit={create} method='post'>
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
              onClick={uploadImage as any}
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
      <ImageUpload
        isShown={isOpen}
        onClose={handleCloseImageUpload}
      ></ImageUpload>
    </>
  );
};
