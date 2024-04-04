'use client';

import { CreatePost as createPost } from '@/app/api/actions/post.actions';
import {
  Button,
  CancelIcon,
  EyeIcon,
  Label,
  SendIcon,
  Textarea,
} from 'clada-storybook';
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
  const [isImageUploadModalOpen, setisImageUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append('media', selectedFile);
    }

    if (formRef.current) {
      const textValue = formRef.current['text'].value;
      if (textValue.trim()) {
        formData.append('text', textValue);
      } else {
        // sending with empty text or without text leads to internal server error 500
        return;
      }
    }

    await createPost(formData);

    if (formRef.current) {
      formRef.current.reset();
    }

    setImgSrc('');
    setSelectedFile(null);
  };

  const uploadImage = (event?: React.MouseEvent) => {
    event?.preventDefault();

    setisImageUploadModalOpen(true);
  };

  const removeImage = (event?: React.MouseEvent) => {
    event?.preventDefault();

    setImgSrc('');
    setSelectedFile(null);
  };

  const handleCloseImageUpload = (file?: File, imgSrc?: string) => {
    console.log('file in create', file);

    if (file) {
      setSelectedFile(file);
    }
    if (imgSrc) {
      setImgSrc(imgSrc);
    }

    setisImageUploadModalOpen(false);
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

          {imgSrc && (
            <div className='relative w-full flex-col max-w-[586px] h-[304px] rounded-m overflow-hidden'>
              <img
                className='absolute w-full h-full object-cover object-center'
                src={imgSrc}
                alt='Selected Image'
              />
            </div>
          )}

          <div className='pt-xs'></div>
          <Textarea id='text' name='text' placeholder={placeholder}></Textarea>
          <div className='pt-s'></div>
          <div className='flex'>
            {!imgSrc && (
              <Button
                color='base'
                Icon={EyeIcon}
                label='Bild hochladen'
                size='m'
                onClick={uploadImage as any}
              ></Button>
            )}
            {imgSrc && (
              <Button
                color='base'
                Icon={CancelIcon}
                label='Bild entfernen'
                size='m'
                onClick={removeImage as any}
              ></Button>
            )}
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
        isShown={isImageUploadModalOpen}
        onClose={handleCloseImageUpload}
      ></ImageUpload>
    </>
  );
};
