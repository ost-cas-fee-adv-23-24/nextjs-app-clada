import { auth } from './api/auth/[...nextauth]/auth';
import React from 'react';
import { GetUsers } from './api/actions/user.actions';
import { GET_POSTS } from '@/utils/api/api-actions-posts';
import { Post } from '@/components/post/post';
import { CreatePost } from '@/components/post/create-post';
import { log } from 'console';
import { getPosts } from '@/mocks/testdata/get-users';

export default async function Home() {
  const session = await auth();
  const users = await GetUsers();

  console.log('session', session);

  let userPosts;
  try {
    // userPosts = await GET_POSTS();

    userPosts = getPosts();

    console.log(userPosts);
  } catch (error) {
    console.log(error);
    throw error;
  }

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

      {userPosts.map((post: TPost) => (
        <div>
          <Post post={post}></Post>
          <div className='pt-l'></div>
        </div>
      ))}
    </div>
  );
}
