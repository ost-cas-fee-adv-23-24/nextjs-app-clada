import PostSkeletonList from '@/post/skeleton/post-skeleton-list';
import { Suspense } from 'react';
import TagedPostsSearchForm from './_taged-posts-search-form';
import TagedPostsWrapper from './_taged-posts-wrapper';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = Array.isArray(searchParams.tag)
    ? (searchParams.tag as string[])
    : [searchParams.tag as string];

  return (
    <section className='w-full'>
      <TagedPostsSearchForm searchParams={searchParams} />
      <div className='pt-m'></div>
      <p>
        Suchresultate für :{' '}
        <span className='text-primary-900'>
          {params.map((param) => '#' + param).join(' ') ?? '...'}
        </span>
      </p>
      <Suspense fallback={<PostSkeletonList />}>
        <TagedPostsWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
