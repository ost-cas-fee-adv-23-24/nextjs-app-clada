'use client';

import { DeletePost } from '@/actions/post.actions';
import { UserPostsContext } from '@/post/user-posts-context';
import { Post } from '@/utils/models';
import { CancelIcon, Toggle } from 'clada-storybook';
import { useContext } from 'react';

const copyLinkLabels = {
  default: 'Copy Link',
  active: 'Link copied',
};

export const DeleteUserPost = ({ post }: { post: Post }) => {
  const { reloadData } = useContext(UserPostsContext);

  const deletePost = async () => {
    await DeletePost(post.id, post.creator.id);
    reloadData();
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
