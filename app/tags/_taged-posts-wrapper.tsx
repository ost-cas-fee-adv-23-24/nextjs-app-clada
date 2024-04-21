'use server';

import PostList from '@/components/post-list/post-list';
import { GetPosts } from '../api/actions/post.actions';
import TagedPostsSearchForm from './_taged-posts-search-form';

export default async function TagedPostsWrapper({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const posts = await GetPosts({
    limit: 10,
    tags: Array.isArray(searchParams.tag)
      ? (searchParams.tag as string[])
      : [searchParams.tag as string],
  });

  return (
    <>
      <div className='pt-m'></div>
      {posts && <PostList postsPaginatedResult={posts} />}
    </>
  );
}
