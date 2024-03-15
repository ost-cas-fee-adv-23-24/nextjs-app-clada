import { TimeDiff } from '../shared/time-diff';
import { InteractionStrip } from '../shared/interaction-strip';
import ZoomImage from '../shared/zoom-image';
import { UserHandle } from '../user/user-handle';
import { Post } from '@/utils/models';
import { GetUserById } from '@/app/api/actions/user.actions';

export const PostContent = async ({
  post,
  size,
}: {
  post: Post;
  size?: 'large';
}) => {
  const textClasses = `mt-s text-black ${size === 'large' && 'text-[20px] tracking-normal leading-relaxed'}`;
  const user = await GetUserById(post?.creator?.id ?? '');
  const displayedName =
    !user.firstname || !user.lastname
      ? user.username
      : `${user?.firstname} ${user.lastname}`;

  return (
    <div>
      <div className='mb-xs mb-font-label-l'>{displayedName}</div>
      <div className='flex'>
        <div>
          <UserHandle name={post?.creator?.username || ''}></UserHandle>
        </div>
        <div className='ml-s'>
          <TimeDiff ulid={post.id}></TimeDiff>
        </div>
      </div>
      <div className={textClasses}>{post?.text}</div>
      <ZoomImage src={post?.mediaUrl}></ZoomImage>
      {post.mediaUrl && <div className='grid place-content-center'></div>}
      <InteractionStrip post={post}></InteractionStrip>
    </div>
  );
};
