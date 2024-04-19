import { CreatePost } from '@/components/post/create-post';
import { Profile } from '@/components/user/profile';
import { RecommendedUsers } from '@/components/user/recommended-users';
import { User } from '@/utils/models';
import {
  GetUserById,
  GetUserFollowees,
  GetUsers,
} from '../api/actions/user.actions';
import { auth } from '../api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();

  const userDummy = {
    id: null,
    username: 'neueruser',
    avatarUrl: '',
    firstname: 'Neuer',
    lastname: 'User',
  } as unknown as User;

  const user = (
    session?.user ? await GetUserById(session?.user.id ?? '') : userDummy
  ) as User;

  const users: Array<User> = (await GetUsers()).data
    .filter((x) => x.id !== user.id)
    .slice(-6);
  const followees: Array<User> = user.id
    ? (await GetUserFollowees(user?.id)).data
    : [];

  // keep showing following state for users for debugging
  /*   const recommendedUsers = users.filter(
    (x) => x.id !== user.id && !followees.find((y) => y.id === x.id)
  ); */

  return (
    <div>
      <div className='pt-m'></div>
      <Profile user={user} editable={true}></Profile>

      <div className='pt-l'></div>

      <CreatePost
        label='Voll leer hier 😲'
        subtitle='Verfasse deinen ersten Mumble oder folge anderen Usern!'
        placeholder='Und was meinst du dazu?'
        showUser={false}
      ></CreatePost>

      <div className='pt-s'></div>
      <RecommendedUsers users={users} followees={followees}></RecommendedUsers>
      <div className='pt-s'></div>
    </div>
  );
}
