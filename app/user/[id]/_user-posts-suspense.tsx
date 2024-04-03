import { GetPosts } from '@/app/api/actions/post.actions';
import { Profile } from '@/components/user/profile';
import { GetUserById } from '../../api/actions/user.actions';
import { auth } from '../../api/auth/[...nextauth]/auth';
import { UserDashboardPosts } from './_user-posts';
import { Suspense } from 'react';
import PostSkeleton from '@/components/skeleton/post-skeleton';
import PostSkeletonList from '@/components/skeleton/post-skeleton-list';
import { User } from '@/utils/models';

let fakeSrc =
  'https://storage.googleapis.com/mumble-api-data/55068752-3e6d-41d4-94d8-905edc23f0a5';

export default async function UserPostsSuspense({ isPersonalUser, user }: { isPersonalUser: boolean, user: User }) {
  const postsResponse = await GetPosts({ creators: [user.id] });

  return (
    <div>
      <UserDashboardPosts
        userId={user.id}
        isPersonalUser={isPersonalUser}
        postsPaginatedResult={postsResponse}
        queryParams={{ creators: [user.id] }}
      ></UserDashboardPosts>
    </div>
  );
}
