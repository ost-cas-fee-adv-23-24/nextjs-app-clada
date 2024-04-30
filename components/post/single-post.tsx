import { Post } from '@/utils/models';
import { PostContent } from './post-content';
import { PostFrame } from './post-frame';

type Props = {
  post: Post;
};

export const SinglePost = ({ post }: Props) => {
  return (
    <PostFrame post={post} data-testid='single-post'>
      <PostContent post={post}></PostContent>
    </PostFrame>
  );
};
