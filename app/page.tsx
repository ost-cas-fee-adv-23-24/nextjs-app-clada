import { Suspense } from 'react';
import HomepagePostsWrapper from './_home-posts-wrapper';
import PostSkeleton from '@/components/skeleton/post-skeleton';

export default function Home() {
  return (
    <section>
      <h1 className='text-primary-600 mb-font-h2'>Willkommen bei Mumble!</h1>
      <h2 className='text-base-500 mb-font-h4'>
        Das Vögelchen zwitschert nicht mehr wie bis anhin. Was sagst du uns
        heute dazu?.
      </h2>
      <div className='pt-l'></div>
      <Suspense fallback={<PostSkeleton />}>
        <HomepagePostsWrapper />
      </Suspense>
    </section>
  );
}
