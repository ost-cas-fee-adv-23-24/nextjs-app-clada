'use server';

import { GetPosts } from '@/actions/post.actions';
import PostList from '@/post/post-list/post-list';

export default async function TagedPostsWrapper({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const tags = Array.isArray(searchParams.tag)
    ? (searchParams.tag as string[])
    : [searchParams.tag as string];

  const queryParams = {
    limit: 10,
    tags: tags,
  };

  if (!searchParams.tag) {
    return (
      <>
        <div className='pt-m'></div>
        <p>Kein Tag angegeben</p>
      </>
    );
  }

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
