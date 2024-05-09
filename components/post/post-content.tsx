'use client';
import { InteractionStrip } from '@/shared/interaction/interaction-strip';
import { UserImage } from '@/shared/user-image';
import ZoomImage from '@/shared/zoom-image';
import { UserHeader } from '@/user/user-header';
import { Post } from '@/utils/models';
import { replaceTags } from '@/utils/tags';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const PostContent = ({ post, size }: { post: Post; size?: 'large' }) => {
  const textClasses = `mt-s text-black ${size === 'large' && 'text-[20px] tracking-normal leading-relaxed'}`;
  const router = useRouter();

  return (
    <div
      className='hover:cursor-pointer'
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <div
        className='absolute -ml-[82px] -mt-xs'
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={`/user/${post.creator.id}`}>
          <UserImage border={true} url={post?.creator?.avatarUrl}></UserImage>
        </Link>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <UserHeader post={post} showTime={true} useLarge={true}></UserHeader>
      </div>
      <div className={textClasses} style={{ wordBreak: 'break-word' }}>
        <p dangerouslySetInnerHTML={{ __html: replaceTags(post.text)! }}></p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <ZoomImage src={post?.mediaUrl}></ZoomImage>
      </div>
      {post.mediaUrl && <div className='grid place-content-center'></div>}
      <div className='pt-s'></div>
      <div onClick={(e) => e.stopPropagation()}>
        <InteractionStrip post={post}></InteractionStrip>
      </div>
    </div>
  );
};
