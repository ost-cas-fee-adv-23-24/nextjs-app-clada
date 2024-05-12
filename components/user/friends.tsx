import { FollowStateProvider } from '@/user/follow-state-context';
import { UserList } from '@/user/user-list';
import { useFollowers, useUsers } from '@/utils/hooks/swr-hooks';

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
            emptyText='Du folgst noch niemandem...'
          ></UserList>
          <div className='pt-s'></div>
          <UserList
            users={followers}
            currentUserId={userId}
            title='Diese User folgen dir'
            emptyText='Im Moment folgt dir noch niemand...'
            filterFollowees={false}
          ></UserList>
          <div className='pt-s'></div>
          <UserList
            users={users}
            currentUserId={userId}
            title='Empfohlene User'
            emptyText='Du folgst bereits allen Usern...'
          ></UserList>
        </FollowStateProvider>
      </div>
    )
  );
};
