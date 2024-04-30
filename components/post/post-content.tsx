'use client'
import { Post } from '@/utils/models';
import Link from 'next/link';
import { InteractionStrip } from '../shared/interaction/interaction-strip';
import { UserImage } from '../shared/user-image';
import ZoomImage from '../shared/zoom-image';
import { UserHeader } from '../user/user-header';
import { replaceTags } from '@/utils/tags';
import { useRouter } from 'next/navigation';

export const PostContent = ({ post, size }: { post: Post; size?: 'large' }) => {
  const textClasses = `mt-s text-black ${size === 'large' && 'text-[20px] tracking-normal leading-relaxed'}`;
  const router = useRouter();

  return (
    <div
      className='hover:cursor-pointer'
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <div className='absolute -ml-[82px] -mt-xs' onClick={(e) => e.stopPropagation()}>
        <Link href={`/user/${post.creator.id}`}>
          <UserImage border={true} url={post?.creator?.avatarUrl}></UserImage>
        </Link>
      </div>
      <UserHeader post={post} showTime={true} useLarge={true}></UserHeader>
      <div className={textClasses} onClick={(e) => e.stopPropagation()}>
        <p dangerouslySetInnerHTML={{ __html: replaceTags(post.text)! }}></p>
      </div>
      <ZoomImage src={post?.mediaUrl}></ZoomImage>
      {post.mediaUrl && <div className="grid place-content-center"></div>}
      <div className="pt-s"></div>
      <div onClick={(e) => e.stopPropagation()}>
        <InteractionStrip post={post}></InteractionStrip>
      </div>
    </div>
  );
};
