'use client';

import { Post } from '@/utils/models';
import { CommentButton } from 'clada-storybook';
import Link from 'next/link';

const commentLabels = {
  zero: 'Comment',
  singular: 'Comment',
  plural: 'Comments',
};

export const Comment = ({ post }: { post: Post }) => {
  return (
    <Link href={`/post/${post.id}`}>
      <CommentButton
        count={post.replies ?? 0}
        hasCommented={!!post?.replies}
        labels={commentLabels}
        onClick={() => false}
        testid='single-post-comment'
      ></CommentButton>
    </Link>
  );
};
