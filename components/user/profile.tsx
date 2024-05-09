'use client';

import { TimeDiff } from '@/components/_shared/time-diff';
import { UserImage } from '@/components/_shared/user-image';
import { Location } from '@/user/location';
import { UserHandle } from '@/user/user-handle';
import { getName } from '@/user/user-utils';
import { User } from '@/utils/models';
import { EditIcon } from 'clada-storybook';
import NextImage from 'next/image';
import { SettingsModal } from '../modals/settings';

const fakeULID = '01HGX50H2SXXPE51S60Q7QY29M';

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
              priority
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
        <h1 className='mb-font-h3'>{getName(user)}</h1>
        <div className='self-center'>
          <SettingsModal
            user={user}
            color='primary'
            showText={false}
          ></SettingsModal>
        </div>
      </div>
      <div className='pt-xs'></div>

      <section className='flex gap-xs'>
        <UserHandle name={user.username} id={user.id}></UserHandle>
        <Location name='Rapperswil'></Location>
        {user.id && (
          <TimeDiff
            ulid={fakeULID ?? user.id.slice(0, 1)}
            text='Mitglied seit '
            href={`/user/${user.id}`}
          ></TimeDiff>
        )}
      </section>

      <div className='pt-s'></div>

      <h2 className='sr-only'>Biografie</h2>

      <section className='text-base-400 mb-font-paragraph-m'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </section>
    </div>
  );
};
