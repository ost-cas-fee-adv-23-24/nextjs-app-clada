import React from 'react';
import { Post } from '@/components/post/single-post';
import { Profile } from '@/components/user/profile';
import { auth } from '../api/auth/[...nextauth]/auth';
import { FollowingState } from '@/components/user/following-state';
import { getPosts } from '@/mocks/testdata/get-users';

let fakeSrc =
  'https://storage.googleapis.com/mumble-api-data/55068752-3e6d-41d4-94d8-905edc23f0a5';

export default async function Home() {
  const session = await auth();

  let user = {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/96249871-b544-48cf-b3ae-bad12deca7fb',
    firstname: 'John D.',
    lastname: 'Mumble',
  };

  let userPosts;

  try {
    userPosts = getPosts();
  } catch (error) {
    throw error;
  }

  return (
    <div>
      <div className='pt-m'></div>
      <Profile user={user} imgUrl={fakeSrc}></Profile>
      <div className='pt-l'></div>
      <FollowingState user={user}></FollowingState>
      <div className='pt-s'></div>
      {userPosts.map((post: TPost, index: number) => (
        <div key='index'>
          <Post post={post}></Post>
          <div className='pt-l'></div>
        </div>
      ))}
    </div>
  );
}
