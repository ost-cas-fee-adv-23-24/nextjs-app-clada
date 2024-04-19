'use client';

import { Post } from '@/utils/models';
import { useSession } from 'next-auth/react';
import { Comment } from './comment';
import { CopyLink } from './copy-link';
import { DeleteUserPost } from './delete';
import { Like } from './like';

export const InteractionStrip = ({
  post,
  reduced = false,
}: {
  post: Post;
  reduced?: boolean;
}) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isCreator = session?.user.id === post.creator.id;

  return (
    <div className='flex -ml-s pl-xxs md:gap-l gap-xs sm:flex-row flex-col'>
      <div className='flex flex-row pl-xxs md:gap-l gap-xs'>
        {!reduced && <Comment post={post}></Comment>}
        <Like post={post} disabled={!isAuthenticated}></Like>
      </div>
      <div className='flex flex-row pl-xxs md:gap-l gap-xs'>
        {!reduced && <CopyLink post={post}></CopyLink>}
        {isCreator && <DeleteUserPost post={post}></DeleteUserPost>}
      </div>
    </div>
  );
};
