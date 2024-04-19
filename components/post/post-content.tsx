import { Post } from '@/utils/models';
import { InteractionStrip } from '../shared/interaction/interaction-strip';
import { UserImage } from '../shared/user-image';
import ZoomImage from '../shared/zoom-image';
import { UserHeader } from '../user/user-header';

export const PostContent = ({ post, size }: { post: Post; size?: 'large' }) => {
  // TODO: refactor to use classnames npm package
  const textClasses = `mt-s text-black ${size === 'large' && 'text-[20px] tracking-normal leading-relaxed'}`;

  return (
    <div>
      <div className='absolute -ml-[82px] -mt-xs'>
        <a href={`/user/${post.creator.id}`}>
          <UserImage border={true} url={post?.creator?.avatarUrl}></UserImage>
        </a>
      </div>
      <UserHeader post={post} showTime={true} useLarge={true}></UserHeader>
      <div className={textClasses} style={{ wordBreak: 'break-word' }}>
        <a href={`/post/${post.id}`}>{post?.text}</a>
      </div>
      <ZoomImage src={post?.mediaUrl}></ZoomImage>
      {post.mediaUrl && <div className='grid place-content-center'></div>}
      <div className='pt-s'></div>
      <InteractionStrip post={post}></InteractionStrip>
    </div>
  );
};
