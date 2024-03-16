import { GetUserById } from '@/app/api/actions/user.actions';
import { auth } from '@/auth';
import { SettingsModal } from '../modal/settings';
import LoginButton from '../shared/button/login-button';
import LogoutButton from '../shared/button/logout-button';

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

  console.log(session);

  const user = await GetUserById(session?.user?.id);

  return (
    <div className='ml-auto flex pt-xxs'>
      {/* <UserImage size='s' url={user.avatarUrl}></UserImage> */}
      <div className='ml-l mr-l flex-col'>
        <SettingsModal />
      </div>{' '}
      <div className='flex-col'>
        <LogoutButton />
      </div>
    </div>
  );
};
