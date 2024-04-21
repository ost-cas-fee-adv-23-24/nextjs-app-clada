import { CreatePost } from '@/components/post/create-post';
import { Profile } from '@/components/user/profile';
import { UserList } from '@/components/user/user-list';
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
      <UserList
        users={users}
        currentUserId={session?.user.id as string}
        title='Empfohlene User'
        emptyText='Du folgst bereits allen Usern...'
      ></UserList>
      <div className='pt-s'></div>
    </div>
  );
}
