'use client';

import { FollowUser, UnFollowUser } from '@/app/api/actions/user.actions';
import { User } from '@/utils/models';
import { Button, MumbleIcon } from 'clada-storybook';
import Link from 'next/link';
import { useState } from 'react';
import { UserImage } from '../shared/user-image';
import {
  FollowState,
  useFollowState,
  useFollowStateUpdate,
} from './follow-state-context';
import { UserHandle } from './user-handle';

export const UserCard = ({
  user,
  isFollowingUser,
  updateFunction,
}: {
  user: User;
  isFollowingUser: boolean;
  updateFunction?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const followState = useFollowState();
  const setFollowState = useFollowStateUpdate();
  const isFollowing = followState[user.id] ?? isFollowingUser;

  const toggleFollowing = async (userId: string) => {
    if (loading) return;

    setLoading(true);

    const newState = !isFollowing;
    try {
      if (newState) {
        await FollowUser(userId);
      } else {
        await UnFollowUser(userId);
      }

      if (updateFunction) {
        updateFunction();
      }

      setFollowState((prevState: FollowState) => ({
        ...prevState,
        [userId]: newState,
      }));
    } catch (error) {
      console.error('Failed to toggle follow state', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-grow sm:max-w-[calc(34%-1em)] sm:min-w-[calc(34%-1em)] w-[calc(50%-1em)] flex-col justify-between items-center gap-s rounded-m bg-white p-s'>
      <Link href={`/user/${user.id}`}>
        <UserImage
          url={user.avatarUrl}
          size='l'
          border={true}
          hoverEffect={true}
        ></UserImage>
      </Link>

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
