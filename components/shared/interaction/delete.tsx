'use client';

import { DeletePost } from '@/app/api/actions/post.actions';
import { Post } from '@/utils/models';
import { CancelIcon, Toggle } from 'clada-storybook';

const copyLinkLabels = {
  default: 'Copy Link',
  active: 'Link copied',
};

export const DeleteUserPost = ({ post }: { post: Post }) => {
  const deletePost = async () => {
    await DeletePost(post.id, post.creator.id);
  };

  return (
    <Toggle
      label={'Delete'}
      isToggled={false}
      onClick={deletePost}
      color='base'
      disabled={false}
      icon={<CancelIcon size='s' color='base' />}
      hoveredIcon={<CancelIcon size='s' color='error' />}
      toggledIcon={<CancelIcon size='s' color='error' />}
    ></Toggle>
  );
};
