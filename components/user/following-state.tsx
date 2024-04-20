'use client';

import { FollowUser, UnFollowUser } from '@/app/api/actions/user.actions';
import { User } from '@/utils/models';
import { Button, CancelIcon } from 'clada-storybook';
import { useState } from 'react';

export const FollowingState = ({
  user,
  isFollowingUser,
}: {
  user: User;
  isFollowingUser: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingUser);

  const toggleFollowing = () => {
    if (isFollowing) {
      UnFollowUser(user.id).then(() => setIsFollowing(false));
    } else {
      FollowUser(user.id).then(() => setIsFollowing(true));
    }

    setIsFollowing(!isFollowing);
  };

  return (
    <div className='flex justify-end gap-s'>
      <div className='self-center text-base-400'>
        {isFollowing && (
          <span>
            Du folgst {user.firstname} {user.lastname}
          </span>
        )}
      </div>
      <div className='flex shrink'>
        <Button
          size='m'
          color='base'
          onClick={toggleFollowing}
          label={isFollowing ? 'Unfollow' : 'Follow'}
          Icon={isFollowing ? CancelIcon : undefined}
        ></Button>
      </div>
    </div>
  );
};
