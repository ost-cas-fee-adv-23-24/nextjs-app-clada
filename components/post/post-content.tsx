import { GetUserById } from '@/app/api/actions/user.actions';
import { Post, PostReply } from '@/utils/models';
import { Reply } from '../reply/reply';
import { InteractionStrip } from '../shared/interaction-strip';
import { TimeDiff } from '../shared/time-diff';
import { UserImage } from '../shared/user-image';
import ZoomImage from '../shared/zoom-image';
import { UserHandle } from '../user/user-handle';

export const PostContent = async ({
  post,
  replies,
  size,
}: {
  post: Post;
  replies?: PostReply[];
  size?: 'large';
}) => {
  // TODO: refactor to use classnames npm package
  const textClasses = `mt-s text-black ${size === 'large' && 'text-[20px] tracking-normal leading-relaxed'}`;
  const user = await GetUserById(post?.creator?.id ?? '');
  const displayedName =
    !user.firstname || !user.lastname
      ? user.username
      : `${user?.firstname} ${user.lastname}`;

  return (
    <div>
      <div className='absolute -ml-[82px] -mt-xs'>
        <UserImage border={true} url={post?.creator?.avatarUrl}></UserImage>
      </div>
      <div className='mb-xs mb-font-label-l'>{displayedName}</div>
      <div className='flex'>
        <div>
          <UserHandle
            name={post?.creator?.username || ''}
            id={post?.creator?.id}
          ></UserHandle>
        </div>
        <div className='ml-s'>
          <TimeDiff ulid={post.id}></TimeDiff>
        </div>
      </div>
      <div className={textClasses}>{post?.text}</div>
      <ZoomImage src={post?.mediaUrl}></ZoomImage>
      {post.mediaUrl && <div className='grid place-content-center'></div>}
      <InteractionStrip post={post}></InteractionStrip>
      {replies && (
        <div className='mt-xl'>
          {replies?.map((reply: PostReply) => (
            <div key={reply.id}>
              <Reply reply={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
