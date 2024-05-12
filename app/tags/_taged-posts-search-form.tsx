'use client';
import { Button, Input } from 'clada-storybook';
import { useRef } from 'react';
import { search } from './search.action';

export default function TagedPostsSearchForm({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialValue = Array.isArray(searchParams.tag)
    ? (searchParams.tag as string[])
    : [searchParams.tag as string];

  return (
    <>
      <form ref={formRef} action={search} className='grid gap-s'>
        <Input
          id='tags'
          name='tags'
          label=''
          placeholder='Suche nach Tags'
          type='text'
          data-testid='tags-text-input'
          defaultValue={initialValue?.join(' ')}
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
