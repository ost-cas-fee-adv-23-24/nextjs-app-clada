import { PostFrame } from './post-frame';
import { PostContent } from './post-content';
import {Post} from '@/utils/models';

type Props = {
  post: Post
}

export const SinglePost = ({ post }: Props) => {
  return (
    <PostFrame post={post}>
      <PostContent post={post}></PostContent>
    </PostFrame>
  );
};
