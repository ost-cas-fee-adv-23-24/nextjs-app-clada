'use client';

import { CreatePost, CreateReply } from '@/app/api/actions/post.actions';
import { ValidationError, isError } from '@/utils/error';
import { Post, PostReply } from '@/utils/models';
import {
  Button,
  CancelIcon,
  SendIcon,
  Textarea,
  UploadIcon,
} from 'clada-storybook';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { ImageUpload } from '../modal/image-upload';

export const CreateContent = ({
  post,
  placeholder = '',
}: {
  post?: Post;
  placeholder?: string;
}) => {
  const [isImageUploadModalOpen, setisImageUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [formState, setFormState] = useState<ValidationError | null>(null);

  const { data: session } = useSession();
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
      }
    }

    let response: Post | PostReply | ValidationError;

    if (post) {
      response = await CreateReply(post.id, formData);
    } else {
      response = await CreatePost(formData, session?.user.id);
    }

    handleResponse(response);
  };

  const handleResponse = (response: ValidationError | any) => {
    if (response && isError(response)) {
      setFormState(response);
      return;
    }

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormState(null);
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
    if (file) {
      setSelectedFile(file);
    }
    if (imgSrc) {
      setImgSrc(imgSrc);
    }

    setisImageUploadModalOpen(false);
  };

  return (
    <div data-testid='mumble-create-content'>
      <form ref={formRef} onSubmit={create} method='post'>
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
        <Textarea
          id='text'
          name='text'
          placeholder={placeholder}
          error={formState?.errors['text']?.join(' ')}
          data-testid='create-post-text-area'
        />
        <div className='pt-s'></div>
        <div className='flex'>
          {!imgSrc && (
            <Button
              color='base'
              Icon={UploadIcon}
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
        <ImageUpload
          isShown={isImageUploadModalOpen}
          onClose={handleCloseImageUpload}
        ></ImageUpload>
      </form>
    </div>
  );
};
