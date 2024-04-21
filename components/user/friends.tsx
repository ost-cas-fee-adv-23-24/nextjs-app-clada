import { useFollowers, useUsers } from '@/utils/hooks/hooks';
import { FollowStateProvider } from './follow-state-context';
import { UserList } from './user-list';

export const Friends = ({ userId }: { userId: string }) => {
  const { users } = useUsers();
  const { followers } = useFollowers(userId);

  return (
    users &&
    followers && (
      <div>
        <FollowStateProvider>
          <UserList
            currentUserId={userId}
            title='Diesen Usern folgst du'
          ></UserList>
          <div className='pt-s'></div>
          <UserList
            users={followers}
            currentUserId={userId}
            title='Diese User folgen dir'
            filterFollowees={false}
          ></UserList>
          <div className='pt-s'></div>
          <UserList
            users={users}
            currentUserId={userId}
            title='Empfohlene User'
          ></UserList>
        </FollowStateProvider>
      </div>
    )
  );
};
