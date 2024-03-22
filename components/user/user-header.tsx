import { GetUserById } from '@/app/api/actions/user.actions';
import { Post } from '@/utils/models';
import { useEffect, useState } from 'react';
import { TimeDiff } from '../shared/time-diff';
import { UserImage } from '../shared/user-image';
import { UserHandle } from './user-handle';
import { getName } from './user-utils';

export const UserHeader = ({
  post,
  showTime = false,
}: {
  post: Post;
  showTime?: boolean;
}) => {
  const [displayedName, setDisplayedName] = useState('Loading...');

  useEffect(() => {
    if (post?.creator?.id) {
      GetUserById(post.creator.id)
        .then((user) => {
          setDisplayedName(getName(user));
        })
        .catch((error) => {
          console.error('Failed to fetch user', error);
          setDisplayedName('Unknown User');
        });
    }
  }, [post?.creator?.id]);

  return (
    <div className='flex'>
      <div className='mr-xs'>
        <UserImage size='s' border={false} url={post?.creator?.avatarUrl} />
      </div>
      <div>
        <div className='mb-xs mb-font-label-m'>{displayedName}</div>
        <div className='flex'>
          <UserHandle name={post.creator.username} id={post.creator.id} />
        </div>
        {showTime && (
          <div className='ml-s'>
            <TimeDiff ulid={post.id}></TimeDiff>
          </div>
        )}
      </div>
    </div>
  );
};
