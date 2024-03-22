'use client';

import { Post } from '@/utils/models';
import { Comment } from './comment';
import { CopyLink } from './copy-link';
import { Like } from './like';

export const InteractionStrip = ({
  post,
  reduced = false,
}: {
  post: Post;
  reduced: boolean;
}) => {
  return (
    <div className='flex -ml-s pl-xxs lg:gap-xl md:gap-l gap-xs'>
      {!reduced && <Comment post={post}></Comment>}
      <Like post={post}></Like>
      {!reduced && <CopyLink post={post}></CopyLink>}
    </div>
  );
};
