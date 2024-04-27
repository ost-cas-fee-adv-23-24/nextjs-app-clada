'use client';

import { UpdateLike } from '@/app/api/actions/post.actions';
import { UserPostsContext } from '@/components/post/user-posts-context';
import { Post } from '@/utils/models';
import { LikeButton } from 'clada-storybook';
import { useContext, useState } from 'react';

const likeLabels = {
  zero: 'Like',
  transition: 'Liked',
  singular: 'Like',
  plural: 'Likes',
};

export const Like = ({ post }: { post: Post }) => {
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [likedBySelf, setLikedBySelf] = useState(post.likedBySelf ?? false);

  const { reloadData } = useContext(UserPostsContext);

  const like = async () => {
    setLikedBySelf(!likedBySelf);
    setLikes(likedBySelf ? likes - 1 : likes + 1);

    try {
      await UpdateLike(post.id, post.likedBySelf);
      reloadData();
    } catch (error) {
      setLikedBySelf(post.likedBySelf ?? false);
      setLikes(post.likedBySelf ? likes - 1 : likes + 1);
    }
  };

  return (
    <LikeButton
      count={likes}
      labels={likeLabels}
      isAlreadyLiked={likedBySelf}
      onClick={like}
    ></LikeButton>
  );
};
