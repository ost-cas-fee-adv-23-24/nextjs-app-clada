'use server';

import { GetUserById } from '@/actions/user.actions';
import { auth } from '@/auth';
import LoginButton from '@/components/_shared/button/login-button';
import LogoutButton from '@/components/_shared/button/logout-button';
import { UserImage } from '@/components/_shared/user-image';
import { SettingsModal } from '@/components/modals/settings';
import { User } from '@/utils/models';
import Link from 'next/link';

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
      <Link href={'/user/' + user?.id} aria-label='User'>
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
