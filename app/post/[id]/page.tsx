import React from 'react';
import { SinglePost } from '@/components/post/single-post';
import { PostContent } from '@/components/post/post-content';
import { CreateReply } from '@/components/reply/create-reply';
import { auth } from '../../api/auth/[...nextauth]/auth';
import { getPosts } from '@/mocks/testdata/get-users';
import { decodeULIDTimestamp } from '@/utils/api/ulid';
import { GetPostById, GetPostReplies } from '@/app/api/actions/post.actions';
import { Post } from '@/utils/models';

export default async function Detail({ params } : { params: {
  id: string
}}) {
  const session = await auth();

  const postId = decodeULIDTimestamp(params.id)
  const detailedPost = await GetPostById(params.id);
  const replies = await GetPostReplies(params.id)

  return (
    <div>
      <div className='pt-s'></div>
      <div className='relative w-full rounded-t-m bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
        <PostContent post={detailedPost} size='large'></PostContent>
      </div>

      <div className='relative w-full bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
        <CreateReply></CreateReply>
      </div>
{/* 
      {replies.data?.map((post: Reply, index: number) => (
        <Reply key='index' reply={post}></Reply>
      ))} */}
    </div>
  );
}
