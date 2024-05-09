'use client';
import { TimeDiff } from '@/shared/time-diff';
import { UserImage } from '@/shared/user-image';
import { UserHandle } from '@/user/user-handle';
import { UserName } from '@/user/user-name';
import { useUser } from '@/utils/hooks/hooks';
import { Post, User } from '@/utils/models';

const UserInfoDisplay = ({
  user,
  useLarge,
  showTime,
  postId,
  noTimeLink,
}: {
  user: User;
  useLarge: boolean;
  showTime: boolean;
  postId: string;
  noTimeLink: boolean;
}) => (
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
            <TimeDiff
              ulid={postId}
              href={noTimeLink ? 'javascript:void(0);' : `/post/${postId}`}
            ></TimeDiff>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const UserHeader = ({
  post,
  currentUserId,
  useCurrentUser = false,
  showTime = false,
  useLarge = false,
  noTimeLink = false,
}: {
  post: Post;
  currentUserId?: string;
  useCurrentUser?: boolean;
  showTime?: boolean;
  useLarge?: boolean;
  noTimeLink?: boolean;
}) => {
  const userId = useCurrentUser ? currentUserId : post.creator.id;
  const { user, isLoading } = useUser(userId);

  const displayUser = isLoading && !useCurrentUser ? post.creator : user;

  return (
    <div>
      {displayUser && (
        <UserInfoDisplay
          user={displayUser}
          useLarge={useLarge}
          showTime={showTime}
          postId={post.id}
          noTimeLink={noTimeLink}
        />
      )}
    </div>
  );
};
