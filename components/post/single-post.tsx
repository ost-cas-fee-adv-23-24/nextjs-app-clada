import { Post, PostReply } from '@/utils/models';
import { PostContent } from './post-content';
import { PostFrame } from './post-frame';

type Props = {
  post: Post;
  replies?: PostReply[];
};

export const SinglePost = ({ post, replies }: Props) => {
  return (
    <PostFrame post={post} data-testid='single-post'>
      <PostContent post={post} replies={replies}></PostContent>
    </PostFrame>
  );
};
