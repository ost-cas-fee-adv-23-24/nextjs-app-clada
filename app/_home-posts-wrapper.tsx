'use server';

import { GetPosts } from '@/actions/post.actions';
import { auth } from '@/auth';
import { CreatePost } from '@/post/create-post';
import PostList from '@/post/post-list/post-list';

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
