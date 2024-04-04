'use client';

import { Label } from 'clada-storybook';
import { CreateContent } from './create-content';
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
  return (
    <>
      <PostFrame hasHover={false} showUser={showUser}>
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
        <CreateContent placeholder={placeholder}></CreateContent>
      </PostFrame>
    </>
  );
};
