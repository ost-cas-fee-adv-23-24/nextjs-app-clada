'use client';

import { followUser, unfollowUser } from '@/app/api/actions/user.actions';
import { User } from '@/utils/models';
import { Button, MumbleIcon } from 'clada-storybook';
import { useState } from 'react';
import { UserImage } from '../shared/user-image';
import { UserHandle } from './user-handle';

export const UserCard = ({
  user,
  isFollowingUser,
}: {
  user: User;
  isFollowingUser: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingUser);

  const toggleFollowing = (userId: string) => {
    if (isFollowing) {
      unfollowUser(userId).then(() => setIsFollowing(false));
    } else {
      followUser(userId).then(() => setIsFollowing(true));
    }

    setIsFollowing(!isFollowing);
  };

  return (
    <div className='flex flex-grow sm:max-w-[calc(34%-1em)] sm:min-w-[calc(34%-1em)] w-[calc(50%-1em)] flex-col justify-between items-center gap-s rounded-m bg-white p-s'>
      <a href={`/user/${user.id}`}>
        <UserImage
          url={user.avatarUrl}
          size='l'
          border={true}
          hoverEffect={true}
        ></UserImage>
      </a>

      <a
        className='mb-font-label-l break-words text-center'
        href={`/user/${user.id}`}
      >
        {user.firstname || user.lastname
          ? `${user.firstname} ${user.lastname}`
          : user.username}
      </a>

      <UserHandle name={user.username} id={user.id}></UserHandle>

      <Button
        color='primary'
        size='m'
        label={isFollowing ? 'Unfollow' : 'Follow'}
        Icon={MumbleIcon}
        onClick={() => toggleFollowing(user.id)}
      ></Button>
    </div>
  );
};
