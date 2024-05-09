import { PostContent } from '@/components/post/post-content';
import { PostFrame } from '@/components/post/post-frame';
import { Post } from '@/utils/models';

export const SinglePost = ({ post }: { post: Post }) => {
  return (
    <PostFrame post={post} data-testid='single-post'>
      <PostContent post={post}></PostContent>
    </PostFrame>
  );
};
