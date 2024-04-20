'use client';

import {
  GetUserFollowees,
  GetUserFollowers,
  GetUsers,
} from '@/app/api/actions/user.actions';
import { User } from '@/utils/models';
import { useEffect, useState } from 'react';
import { UserList } from './user-list';

export const Friends = ({ userId }: { userId: string }) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [followees, setFollowees] = useState<Array<User>>([]);
  const [followers, setFollowers] = useState<Array<User>>([]);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    const loadedUsers = (await GetUsers()).data
      .filter((x) => x.id !== userId)
      .slice(-6);

    const loadedFollowees = userId ? (await GetUserFollowees(userId)).data : [];
    setFollowees(loadedFollowees);

    console.log('loadedFollowees', loadedFollowees);

    setUsers(loadedUsers);
    console.log('loadedUsers', loadedUsers);

    const loadedFollowers = userId ? (await GetUserFollowers(userId)).data : [];
    setFollowers(loadedFollowers);

    console.log('loadedFollowers', loadedFollowers);
  };

  return (
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
        users={users}
        followees={followees}
        title='Empfohlene User'
      ></UserList>
    </div>
  );
};
