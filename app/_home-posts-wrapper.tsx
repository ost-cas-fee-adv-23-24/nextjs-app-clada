'use server';

import PostList from '@/components/post-list/post-list';
import { CreatePost } from '@/components/post/create-post';
import { GetPosts } from './api/actions/post.actions';
import { auth } from './api/auth/[...nextauth]/auth';

export default async function HomepagePostsWrapper() {
  const session = await auth();

  const posts = await GetPosts({
    limit: 10,
  });

  return (
    <>
      {session && <CreatePost />}
      <div className='pt-m'></div>
      {posts && <PostList postsPaginatedResult={posts} />}
    </>
  );
}
