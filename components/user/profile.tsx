'use client';

import { User } from '@/utils/models';
import { EditIcon, SettingsIcon } from 'clada-storybook';
import NextImage from 'next/image';
import { TimeDiff } from '../shared/time-diff';
import { UserImage } from '../shared/user-image';
import { Location } from './location';
import { UserHandle } from './user-handle';

export const Profile = ({
  user,
  editable = false,
  imgUrl = '',
}: {
  user: User;
  editable?: boolean;
  imgUrl?: string;
}) => {
  return (
    <div>
      <div className='relative'>
        <div className='group relative h-auto w-full overflow-hidden rounded-m'>
          {imgUrl && (
            <NextImage
              src={imgUrl}
              alt='post image'
              width={680}
              height={320}
              className='w-full transition-all duration-300 ease-in-out'
              style={{ aspectRatio: '68 / 32' }}
            />
          )}
          {editable && (
            <div>
              {!imgUrl && (
                <div className='h-[320px] w-full cursor-pointer bg-primary-100'></div>
              )}
              <div className='absolute inset-0 flex h-[320px] w-full cursor-pointer items-center justify-center bg-primary-600 bg-opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-50'>
                <div className='transform opacity-0 transition-opacity duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100'>
                  <span className='inline-block text-white'>
                    <EditIcon color='white' size='l' />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='absolute right-0 -mt-[80px] mr-[25px]'>
          <UserImage
            border={true}
            size='xl'
            url={user.avatarUrl}
            editable={editable}
          ></UserImage>
        </div>
      </div>
      <div className='pt-l'></div>
      <div className='flex gap-xs'>
        <div className='mb-font-h3'>
          {user.firstname} {user.lastname}
        </div>
        <div className='self-center'>
          <SettingsIcon color='primary'></SettingsIcon>
        </div>
      </div>
      <div className='pt-xs'></div>
      <div className='flex gap-xs'>
        <UserHandle name={user.username} id={user.id}></UserHandle>
        <Location name='fake location'></Location>
        <TimeDiff ulid={user.id} text='Mitglied seit '></TimeDiff>
      </div>
      <div className='pt-s'></div>
      <div className='text-base-400'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </div>
    </div>
  );
};
