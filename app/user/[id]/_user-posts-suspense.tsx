'use server';
import { GetPosts } from '@/actions/post.actions';
import { User } from '@/utils/models';
import { UserDashboard } from './_user-posts';

export default async function UserPostsSuspense({
  isPersonalUser,
  user,
}: {
  isPersonalUser: boolean;
  user: User;
}) {
  const posts = await GetPosts({ creators: [user.id] });

  return (
    <div>
      <UserDashboard
        userId={user.id}
        isPersonalUser={isPersonalUser}
        postsPaginatedResult={posts}
        queryParams={{ creators: [user.id] }}
      ></UserDashboard>
    </div>
  );
}
