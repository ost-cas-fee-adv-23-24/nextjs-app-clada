'use client';

import { Post } from '@/utils/models';
import { CommentButton } from 'clada-storybook';
import { useRouter } from 'next/navigation';

const commentLabels = {
  zero: 'Comment',
  singular: 'Comment',
  plural: 'Comments',
};

export const Comment = ({ post }: { post: Post }) => {
  const router = useRouter();

  const handleCommentClick = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <CommentButton
      count={post.replies ?? 0}
      hasCommented={!!post?.replies}
      labels={commentLabels}
      onClick={handleCommentClick}
    ></CommentButton>
  );
};
