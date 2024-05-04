'use client';

import { DeletePost } from '@/app/api/actions/post.actions';
import { UserPostsContext } from '@/components/post/user-posts-context';
import { Post } from '@/utils/models';
import { CancelIcon, Toggle } from 'clada-storybook';
import { useContext } from 'react';

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
      testid='single-post-delete'
    ></Toggle>
  );
};
