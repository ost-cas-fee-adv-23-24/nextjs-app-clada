import { TimeDiff } from '../shared/time-diff';
import { UserHandle } from '../user/user-handle';
import { InteractionStrip } from '../shared/interaction-strip';
import { PostFrame } from './post-frame';
import { PostContent } from './post-content';

export const Post = ({ post }: { post: TPost }) => {
  return (
    <PostFrame post={post}>
      <PostContent post={post}></PostContent>
    </PostFrame>
  );
};
