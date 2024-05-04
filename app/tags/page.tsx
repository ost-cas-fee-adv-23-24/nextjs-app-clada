import TagedPostsSearchForm from '@/app/tags/_taged-posts-search-form';
import PostSkeletonList from '@/components/skeleton/post-skeleton-list';
import { Suspense } from 'react';
import TagedPostsWrapper from './_taged-posts-wrapper';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <section className='w-full'>
      <p>Suchresultate für : #{searchParams['tag'] ?? '...'}</p>
      <div className='pt-m'></div>
      <TagedPostsSearchForm />
      <Suspense fallback={<PostSkeletonList />}>
        <TagedPostsWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
