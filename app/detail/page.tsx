import React from 'react';
import { GET_POSTS } from '@/utils/api/api-actions-posts';
import { Reply } from '@/components/reply/reply';
import { Post } from '@/components/post/post';
import { CreatePost } from '@/components/post/create-post';
import { PostContent } from '@/components/post/post-content';
import { CreateReply } from '@/components/reply/create-reply';
import { auth } from '../api/auth/[...nextauth]/auth';

export default async function Detail() {
  const session = await auth();
  console.log('session', session);

  let userPosts: Array<TPost>;
  let replies: Array<TPost>;

  let detailedPost: TPost;
  try {
    userPosts = await GET_POSTS();
    detailedPost = userPosts[15];
    replies = userPosts.slice(1, 15);
  } catch (error) {
    console.log(error);
    throw error;
  }

  return (
    <div>
      <div className='pt-s'></div>
      <div className='relative w-full rounded-t-m bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
        <PostContent post={detailedPost} size='large'></PostContent>
      </div>

      <div className='relative w-full bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
        <CreateReply></CreateReply>
      </div>

      {replies.map((post: TPost) => (
        <Reply reply={post}></Reply>
      ))}
    </div>
  );
}
