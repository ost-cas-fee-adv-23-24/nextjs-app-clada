import { Post, PostReply } from '@/utils/models';
import { InteractionStrip } from '../shared/interaction/interaction-strip';
import { TimeDiff } from '../shared/time-diff';
import { UserImage } from '../shared/user-image';
import ZoomImage from '../shared/zoom-image';
import { UserHandle } from '../user/user-handle';

export const PostContent = ({
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
  // const user = await GetUserById(post?.creator?.id ?? '');
  // const displayedName = getName(user);
  const displayedName = post.creator.username;

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
      <div className={textClasses}>
        <a href={`/post/${post.id}`}>{post?.text}</a>
      </div>
      <ZoomImage src={post?.mediaUrl}></ZoomImage>
      {post.mediaUrl && <div className='grid place-content-center'></div>}
      <div className='pt-s'></div>
      <InteractionStrip post={post}></InteractionStrip>
    </div>
  );
};
