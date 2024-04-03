import { GetPosts } from '@/app/api/actions/post.actions';
import { Profile } from '@/components/user/profile';
import { GetUserById } from '../../api/actions/user.actions';
import { auth } from '../../api/auth/[...nextauth]/auth';
import { UserDashboardPosts } from './_user-posts';
import { Suspense } from 'react';
import PostSkeleton from '@/components/skeleton/post-skeleton';
import PostSkeletonList from '@/components/skeleton/post-skeleton-list';
import UserPostsSuspense from './_user-posts-suspense';

let fakeSrc =
  'https://storage.googleapis.com/mumble-api-data/55068752-3e6d-41d4-94d8-905edc23f0a5';

export default async function Home({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = await GetUserById(params.id);

  const isPersonalUser = session?.user?.id === user.id;

  return (
    <div>
      <div className='pt-m'></div>

      <Profile user={user} editable={true} imgUrl={fakeSrc}></Profile>

      <div className='pt-l'></div>

      <Suspense fallback={<PostSkeletonList count={10} />}>
        <UserPostsSuspense isPersonalUser={isPersonalUser} user={user} />
      </Suspense>
    </div>
  );
}
