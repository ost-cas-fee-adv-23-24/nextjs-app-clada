import { TimeDiff } from '../shared/time-diff';
import { InteractionStrip } from '../shared/interaction-strip';
import ZoomImage from '../shared/zoom-image';
import { UserHandle } from '../user/user-handle';

export const PostContent = ({
  post,
  size,
}: {
  post: TPost;
  size?: 'large';
}) => {
  const textClasses = `mt-s text-black ${size === 'large' && 'text-[20px] tracking-normal leading-relaxed'}`;

  return (
    <div>
      <div className='mb-xs mb-font-label-l'>John D. Mumble</div>
      <div className='flex'>
        <div>
          <UserHandle name={post.creator.username}></UserHandle>
        </div>
        <div className='ml-s'>
          <TimeDiff postId={post.id}></TimeDiff>
        </div>
      </div>
      <div className={textClasses}>{post.text}</div>
      <ZoomImage src={post.mediaUrl}></ZoomImage>
      {post.mediaUrl && <div className='grid place-content-center'></div>}
      <InteractionStrip post={post}></InteractionStrip>
    </div>
  );
};
