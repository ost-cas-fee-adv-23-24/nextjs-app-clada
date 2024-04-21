'use server';

import { GetUserById } from '@/app/api/actions/user.actions';
import { auth } from '@/auth';
import { User } from '@/utils/models';
import Link from 'next/link';
import { SettingsModal } from '../modal/settings';
import LoginButton from '../shared/button/login-button';
import LogoutButton from '../shared/button/logout-button';
import { UserImage } from '../shared/user-image';

export const HeaderUserActions = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className='ml-auto flex pt-xxs'>
        <div className='flex-col'>
          <LoginButton />
        </div>
      </div>
    );
  }

  const user = await GetUserById(session?.user?.id);

  return (
    <div className='ml-auto flex pt-xxs'>
      <Link href={'/user/' + user?.id}>
        <UserImage size='s' url={user?.avatarUrl}></UserImage>
      </Link>
      <div className='ml-l mr-l flex-col'>
        <SettingsModal user={user as User} />
      </div>{' '}
      <div className='flex-col'>
        <LogoutButton />
      </div>
    </div>
  );
};
