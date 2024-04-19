import { GetUserById } from '@/app/api/actions/user.actions';
import { Post, PrivateUser, User } from '@/utils/models';
import { useEffect, useState } from 'react';
import { TimeDiff } from '../shared/time-diff';
import { UserImage } from '../shared/user-image';
import { UserHandle } from './user-handle';
import { UserName } from './user-name';

export const UserHeader = ({
  post,
  currentUserId,
  useCurrentUser = false,
  showTime = false,
  useLarge = false,
}: {
  post: Post;
  currentUserId?: string;
  useCurrentUser?: boolean;
  showTime?: boolean;
  useLarge?: boolean;
}) => {
  const [user, setUser] = useState<User | PrivateUser | undefined>(
    !useCurrentUser ? post.creator : undefined
  );

  useEffect(() => {
    if (currentUserId || (!useCurrentUser && post?.creator?.id)) {
      GetUserById(
        !useCurrentUser ? post.creator.id : currentUserId ? currentUserId : ''
      )
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error('Failed to fetch user', error);
        });
    }
  }, [currentUserId, post?.creator?.id]);

  return (
    <div className='min-h-[44px]'>
      {user && (
        <div className='flex'>
          {!useLarge && (
            <div className='mr-xs'>
              <UserImage size='s' border={false} url={user.avatarUrl} />
            </div>
          )}
          <div>
            <UserName user={user} useLarge={useLarge}></UserName>
            <div className='flex'>
              <UserHandle name={user.username} id={user.id} />

              {showTime && (
                <div className='ml-s'>
                  <TimeDiff ulid={post.id}></TimeDiff>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
