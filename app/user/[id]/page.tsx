import PostSkeletonList from '@/components/skeleton/post-skeleton-list';
import { FollowingState } from '@/components/user/following-state';
import { Profile } from '@/components/user/profile';
import { Suspense } from 'react';
import {
  GetUserById,
  GetUserFollowees,
  GetUserFollowers,
} from '../../api/actions/user.actions';
import { auth } from '../../api/auth/[...nextauth]/auth';
import UserPostsSuspense from './_user-posts-suspense';

let fakeSrc =
  'https://storage.googleapis.com/mumble-api-data/87945da0-e263-4fff-b188-f0aa878d3316';

export default async function Home({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = await GetUserById(params.id);

  const followers = await GetUserFollowers(params.id);
  const followees = await GetUserFollowees(params.id);

  const isFollowed = followers.data.find(
    (followers) => session?.user?.id && followers.id === session?.user?.id
  );

  const isPersonalUser = session?.user?.id === user.id;

  return (
    <div>
      <div className='pt-m'></div>

      <Profile user={user} editable={isPersonalUser} imgUrl={fakeSrc}></Profile>

      <div className='pt-l'></div>
      {!isPersonalUser && (
        <div>
          <FollowingState
            user={user}
            isFollowingUser={!!isFollowed}
          ></FollowingState>
          <div className='pt-s'></div>
        </div>
      )}

      <Suspense fallback={<PostSkeletonList count={10} />}>
        <UserPostsSuspense isPersonalUser={isPersonalUser} user={user} />
      </Suspense>
    </div>
  );
}
