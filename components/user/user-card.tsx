'use client';

import { Button, MumbleIcon } from 'clada-storybook';
import { UserImage } from '../shared/user-image';
import { UserHandle } from './user-handle';

export const UserCard = ({ user }: { user: TUser }) => {
  return (
    <div className='flex min-w-[150px] flex-grow flex-col items-center gap-s rounded-m bg-white p-s'>
      <UserImage
        url={user.avatarUrl}
        size='l'
        border={true}
        hoverEffect={true}
      ></UserImage>
      <div className='mb-font-label-l'>
        {user.firstname} {user.lastname}
      </div>
      <UserHandle name={user.username} id={user.id}></UserHandle>
      <Button
        color='primary'
        size='m'
        label='Follow'
        Icon={MumbleIcon}
        onClick={() => alert('button clicked')}
      ></Button>
    </div>
  );
};
