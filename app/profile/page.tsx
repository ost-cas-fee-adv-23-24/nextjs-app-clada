import React from 'react';
import { GET_POSTS } from '@/utils/api/api-actions-posts';
import { Post } from '@/components/post/post';
import { Profile } from '@/components/user/profile';
import { auth } from '../api/auth/[...nextauth]/auth';
import { FollowingState } from '@/components/user/following-state';

let fakeSrc =
  'https://storage.googleapis.com/mumble-api-data/55068752-3e6d-41d4-94d8-905edc23f0a5';

export default async function Home() {
  const session = await auth();
  console.log('session', session);

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
    userPosts = await GET_POSTS();
  } catch (error) {
    console.log(error);
    throw error;
  }

  console.log(
    'userPosts',
    userPosts.filter((x) => x.mediaUrl)
  );

  return (
    <div>
      <div className='pt-m'></div>
      <Profile user={user} imgUrl={fakeSrc}></Profile>
      <div className='pt-l'></div>
      <FollowingState user={user}></FollowingState>
      <div className='pt-s'></div>
      {userPosts.map((post: TPost, index: number) => (
        <div>
          <Post key='index' post={post}></Post>
          <div className='pt-l'></div>
        </div>
      ))}
    </div>
  );
}
