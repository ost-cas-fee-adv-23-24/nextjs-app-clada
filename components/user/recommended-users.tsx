'use client';

import { UserCard } from '@/user/user-card';
import { User } from '@/utils/models';

export const RecommendedUsers = ({
  users,
  followees,
}: {
  users: Array<User>;
  followees: Array<User>;
}) => {
  return (
    <div>
      <div className='mb-font-h3'>Empfohlene User</div>
      <div className='pt-s'></div>
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
