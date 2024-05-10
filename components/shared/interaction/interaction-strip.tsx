'use client';

import { Comment } from '@/shared/interaction/comment';
import { CopyLink } from '@/shared/interaction/copy-link';
import { DeleteUserPost } from '@/shared/interaction/delete';
import { Like } from '@/shared/interaction/like';
import { useAuthSession } from '@/utils/hooks/swr-hooks';
import { Post } from '@/utils/models';

export const InteractionStrip = ({
  post,
  reduced = false,
}: {
  post: Post;
  reduced?: boolean;
}) => {
  const { session: session } = useAuthSession();
  const isCreator = session?.user.id === post.creator.id;

  return (
    <div className='flex -ml-s pl-xxs md:gap-l gap-xs sm:flex-row flex-col'>
      <div className='flex flex-row pl-xxs md:gap-l gap-xs'>
        {!reduced && <Comment post={post}></Comment>}
        <Like post={post}></Like>
      </div>
      <div className='flex flex-row pl-xxs md:gap-l gap-xs'>
        {!reduced && <CopyLink post={post}></CopyLink>}
        {isCreator && <DeleteUserPost post={post}></DeleteUserPost>}
      </div>
    </div>
  );
};
