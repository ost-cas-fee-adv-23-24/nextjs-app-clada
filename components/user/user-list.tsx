'use client';

import { User } from '@/utils/models';
import { UserCard } from './user-card';

export const UserList = ({
  users,
  followees,
  title,
}: {
  users: Array<User>;
  followees: Array<User>;
  title: string;
}) => {
  return (
    <div>
      {users && followees && (
        <div>
          <div className='mb-font-h3'>{title}</div>
          <div className='pt-s'></div>
        </div>
      )}
      <div className='mx-auto flex w-full flex-wrap gap-s'>
        {users &&
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFollowingUser={!!followees.find((x) => x.id === user.id)}
            ></UserCard>
          ))}
      </div>
    </div>
  );
};
