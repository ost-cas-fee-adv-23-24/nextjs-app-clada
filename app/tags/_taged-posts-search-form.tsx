'use client';
import { Button, Input } from 'clada-storybook';
import { redirect } from 'next/navigation';
import { useRef } from 'react';

export default async function TagedPostsSearchForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    // 'use server';
    const searchParams = {
      tag: formData.get('tags') as string,
    };

    redirect(`/tags?tag=${searchParams.tag}`);
  };

  return (
    <>
      <form ref={formRef} action={action} className='grid gap-s'>
        <Input
          id='tags'
          name='tags'
          label=''
          placeholder='LESS GO'
          type='text'
        />
      </form>
      <div className='pt-m'></div>
      <Button
        label='Suchen'
        color='primary'
        size='m'
        onClick={() => {
          formRef.current?.requestSubmit();
        }}
      />
    </>
  );
}
