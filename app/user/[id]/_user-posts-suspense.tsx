import { GetPosts } from '@/app/api/actions/post.actions';
import { User } from '@/utils/models';
import { UserDashboard } from './_user-posts';

export default async function UserPostsSuspense({
  isPersonalUser,
  user,
}: {
  isPersonalUser: boolean;
  user: User;
}) {
  const postsResponse = await GetPosts({ creators: [user.id] });

  return (
    <div>
      <UserDashboard
        userId={user.id}
        isPersonalUser={isPersonalUser}
        postsPaginatedResult={postsResponse}
        queryParams={{ creators: [user.id] }}
      ></UserDashboard>
    </div>
  );
}
