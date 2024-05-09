'use server';

import { GetPosts } from '@/actions/post.actions';
import { auth } from '@/auth';
import PostList from '@/components/post-list/post-list';
import { CreatePost } from '@/components/post/create-post';

export default async function HomepagePostsWrapper() {
  const session = await auth();

  const posts = await GetPosts({
    limit: 10,
  });

  return (
    <>
      <h2 className='sr-only'>Erstelle einen Beitrag</h2>
      {session && <CreatePost />}
      <div className='pt-m'></div>
      <h2 className='sr-only'>Aktuelle Beiträge</h2>
      {posts && <PostList postsPaginatedResult={posts} />}
    </>
  );
}
