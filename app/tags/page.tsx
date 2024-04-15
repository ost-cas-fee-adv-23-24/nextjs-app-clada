import PostSkeletonList from '@/components/skeleton/post-skeleton-list';
import { Input } from 'clada-storybook';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import TagedPostsWrapper from './_taged-posts-wrapper';

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const action = async (formData: FormData) => {
    'use server';
    const searchParams = {
      tag: formData.get('tags') as string,
    };

    redirect(`/tags?tag=${searchParams.tag}`);
  };

  return (
    <section className='w-full'>
      <form action={action} className='grid gap-s'>
        {/* <Input
          id='tags'
          name='tags'
          label=''
          placeholder='LESS GO'
          type='text'
        /> */}
        
        <input
          id='tags'
          name='tags'
          placeholder='LESS GO'
          type='text'
        />


<input
          type='submit'
        />

        {/* <Button label='Suchen'  color='base' size='m' /> */}
      </form>
      <div className='pt-l'></div>
      <Suspense fallback={<PostSkeletonList />}>
        <TagedPostsWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
