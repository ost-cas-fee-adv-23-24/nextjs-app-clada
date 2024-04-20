'use client';

import { useFollowees, useFollowers, useUsers } from '@/utils/hooks/hooks';
import { User } from '@/utils/models';
import { useEffect, useState } from 'react';
import { UserList } from './user-list';

export const Friends = ({ userId }: { userId: string }) => {
  const [recommendedUsers, setRecommendedUsers] = useState<Array<User>>([]);

  const { users } = useUsers();
  const { followees } = useFollowees(userId);
  const { followers } = useFollowers(userId);

  useEffect(() => {
    setRecommendedUsers(
      users?.filter((x) => x.id !== userId).slice(-6) as Array<User>
    );
  }, [users]);

  return (
    followees &&
    users &&
    followers && (
      <div>
        <UserList
          users={followees}
          followees={followees}
          title='Diesen Usern folgst du'
        ></UserList>
        <div className='pt-s'></div>
        <UserList
          users={followers}
          followees={followees}
          title='Diese User folgen dir'
        ></UserList>
        <div className='pt-s'></div>
        <UserList
          users={recommendedUsers}
          followees={followees}
          title='Empfohlene User'
        ></UserList>
      </div>
    )
  );
};
