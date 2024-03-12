'use client';

import { Button, CancelIcon } from 'clada-storybook';

export const FollowingState = ({ user }: { user: TUser }) => {
  return (
    <div className='flex justify-end gap-s'>
      <div className='self-center text-base-400'>
        Du folgst {user.firstname} {user.lastname}
      </div>
      <div className='flex shrink'>
        <Button
          size='m'
          color='base'
          onClick={() => ''}
          label='Unfollow'
          Icon={CancelIcon}
        ></Button>
      </div>
    </div>
  );
};
