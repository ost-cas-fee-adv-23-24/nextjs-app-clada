import { GetPosts } from '@/app/api/actions/post.actions';
import { SinglePost } from '@/components/post/single-post';
import { Profile } from '@/components/user/profile';
import { UserTabs } from '@/components/user/user-tabs';
import { Post, User } from '@/utils/models';
import { GetUserById } from '../../api/actions/user.actions';
import { auth } from '../../api/auth/[...nextauth]/auth';

let fakeSrc =
  'https://storage.googleapis.com/mumble-api-data/55068752-3e6d-41d4-94d8-905edc23f0a5';

export default async function Home({ params }: { params: { id: string } }) {
  const user = await GetUserById(params.id);
  const userPosts = await GetPosts({ creators: [params.id] });

  return (
    <div>
      <div className='pt-m'></div>

      <Profile user={user as User} editable={true} imgUrl={fakeSrc}></Profile>

      <div className='pt-l'></div>

      <UserTabs></UserTabs>

      <div className='pt-s'></div>
      {userPosts &&
        userPosts.data?.map((post: Post, index: number) => (
          <div key={index}>
            <SinglePost post={post} />
            <div className='pt-l'></div>
          </div>
        ))}
    </div>
  );
}
