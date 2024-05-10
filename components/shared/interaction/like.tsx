'use client';

import { UpdateLike } from '@/actions/post.actions';
import { UserPostsContext } from '@/components/post/user-posts-context';
import { useAuthSession } from '@/utils/hooks/swr-hooks';
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

  const { reloadData, isProvided } = useContext(UserPostsContext);

  const { session: session } = useAuthSession();

  const like = async () => {
    setLikedBySelf(!likedBySelf);
    setLikes(likedBySelf ? likes - 1 : likes + 1);

    try {
      await UpdateLike(
        post.id,
        post.likedBySelf,
        isProvided ? session?.user.id : undefined
      );
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
