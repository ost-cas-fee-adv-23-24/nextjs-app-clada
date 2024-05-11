'use client';

import { FollowUser, UnFollowUser } from '@/actions/user.actions';
import { UserImage } from '@/components/_shared/user-image';
import {
  FollowState,
  useFollowState,
  useFollowStateUpdate,
} from '@/user/follow-state-context';
import { UserHandle } from '@/user/user-handle';
import { User } from '@/utils/models';
import { createSnippet } from '@/utils/strings';
import { Button, MumbleIcon } from 'clada-storybook';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const UserCard = ({
  user,
  isFollowingUser,
  updateFunction,
}: {
  user: User;
  isFollowingUser: boolean;
  updateFunction?: () => void;
}) => {
  const [displayUserName, setDisplayUserName] = useState(
    createSnippet(user.username, 12)
  );

  useEffect(() => {
    setDisplayUserName(createSnippet(user.username, 12));
  }, [user]);

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

      <UserHandle name={displayUserName} id={user.id}></UserHandle>

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
