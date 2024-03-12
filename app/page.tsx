import React from 'react';
import { CreatePost } from '@/components/post/create-post';
import { GetPosts } from './api/actions/post.actions';
import { Post } from '@/utils/models';
import { PostList } from '@/components/post-list/post-list';

export default async function Home() {
  const posts = await GetPosts({
    limit: 10,
  });

  const loadMore = async () => {
    'use server'

    const lastIndex = posts.data?.length ?? 10 - 1;

    GetPosts({
      limit: 10,
      olderThan: posts.data?.at(lastIndex)?.id,
    }).then(result => posts.data?.concat(result.data as Post[]))
};

  return (
    <section>
      <h1 className='text-primary-600 mb-font-h2'>Willkommen bei Mumble!</h1>
      <h2 className='text-base-500 mb-font-h4'>
        Das Vögellchen zwitschert nicht mehr wie bis anhin. Was sagst du uns
        heute dazu?.
      </h2>
      <div className='pt-l'></div>
      <CreatePost></CreatePost>
      <div className='pt-m'></div>
      <PostList posts={posts} loadMoreFun={loadMore} />
    </section>
  );
}
