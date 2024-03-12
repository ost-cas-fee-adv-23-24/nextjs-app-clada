import React from 'react';
import { SinglePost } from '@/components/post/single-post';
import { CreatePost } from '@/components/post/create-post';
import { GetPosts } from './api/actions/post.actions';

export default async function Home() {
  const posts = await GetPosts();

  return (
    <div>
      <h1 className='text-primary-600 mb-font-h2'>Welcome to the Mumble!</h1>
      <h2 className='text-base-500 mb-font-h4'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </h2>
      <div className='pt-l'></div>
      <CreatePost></CreatePost>
      <div className='pt-m'></div>

      {posts?.data?.map((post, index: number) => (
        <div key={index}>
          <SinglePost post={post}></SinglePost>
          <div className='pt-l'></div>
        </div>
      ))}
    </div>
  );
}
