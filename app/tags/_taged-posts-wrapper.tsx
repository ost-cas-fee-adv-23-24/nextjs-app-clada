'use server';

import { GetPosts } from '@/actions/post.actions';
import PostList from '@/post/post-list/post-list';

export default async function TagedPostsWrapper({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const queryParams = {
    limit: 10,
    tags: Array.isArray(searchParams.tag)
      ? (searchParams.tag as string[])
      : [searchParams.tag as string],
  };

  const posts = await GetPosts(queryParams);

  return (
    <>
      <div className='pt-m'></div>
      {posts && (
        <PostList postsPaginatedResult={posts} queryParams={queryParams} />
      )}
    </>
  );
}
