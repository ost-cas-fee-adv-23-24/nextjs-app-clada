import React from 'react';
import { Post } from '@/components/post/post';
import { Profile } from '@/components/user/profile';
import { auth } from '../../api/auth/[...nextauth]/auth';
import { UserTabs } from '@/components/user/user-tabs';
import { CreatePost } from '@/components/post/create-post';
import { CreateReply } from '@/components/reply/create-reply';
import { RecommendedUsers } from '@/components/user/recommended-users';
import { getPosts } from '@/mocks/testdata/get-users';

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
    userPosts = getPosts();
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

      <Profile user={user} editable={true}></Profile>

      <div className='pt-l'></div>

      <CreatePost
        label='Voll leer hier 😲'
        subtitle='Verfasse deinen ersten Mumble oder folge anderen Usern!'
        placeholder='Und was meinst du dazu?'
        showUser={false}
      ></CreatePost>

      <div className='pt-s'></div>
      <RecommendedUsers></RecommendedUsers>

      <div className='pt-s'></div>
      <div className='mb-font-h3'>Empfohlene Mumbles</div>
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
