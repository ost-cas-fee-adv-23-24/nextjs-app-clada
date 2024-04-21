'use client';

import { GetUserFollowees } from '@/app/api/actions/user.actions';
import { useFollowees } from '@/utils/hooks/hooks';
import { User } from '@/utils/models';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { UserCard } from './user-card';

export const UserList = ({
  users,
  currentUserId,
  title,
  filterFollowees = true,
}: {
  users?: Array<User>;
  currentUserId: string;
  title: string;
  filterFollowees?: boolean;
}) => {
  const [displayUsers, setDisplayUsers] = useState<Array<User>>([]);

  const { followees } = useFollowees(currentUserId);

  const update = async (userId: string) => {
    await mutate(`followees-${userId}`, await GetUserFollowees(userId), {
      revalidate: false,
    });
  };

  useEffect(() => {
    if (filterFollowees) {
      setDisplayUsers(
        users
          ?.filter((x) => !followees?.find((y) => y.id === x.id))
          .slice(-6) as Array<User>
      );
    } else {
      setDisplayUsers(users as Array<User>);
    }
  }, [followees]);

  return (
    <div>
      {followees && (
        <div>
          <div className='mb-font-h3'>{title}</div>
          <div className='pt-s'></div>
        </div>
      )}
      <div className='mx-auto flex w-full flex-wrap gap-s'>
        {displayUsers &&
          displayUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFollowingUser={!!followees?.find((x) => x.id === user.id)}
              updateFunction={() => update(currentUserId)}
            ></UserCard>
          ))}
        {!displayUsers &&
          followees &&
          followees.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFollowingUser={!!followees.find((x) => x.id === user.id)}
              updateFunction={() => update(currentUserId)}
            ></UserCard>
          ))}
      </div>
    </div>
  );
};
