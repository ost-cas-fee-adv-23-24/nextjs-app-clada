'use client';
import { GetUserById } from '@/app/api/actions/user.actions';
import { Post, PostReply, User } from '@/utils/models';
import { useEffect, useState } from 'react';
import { InteractionStrip } from '../shared/interaction/interaction-strip';
import { UserImage } from '../shared/user-image';
import ZoomImage from '../shared/zoom-image';
import { UserHeader } from '../user/user-header';

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

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (post?.creator?.id) {
      GetUserById(post.creator.id)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error('Failed to fetch user', error);
        });
    }
  }, [post?.creator?.id]);

  return (
    <div>
      <div className='absolute -ml-[82px] -mt-xs'>
        <UserImage border={true} url={post?.creator?.avatarUrl}></UserImage>
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
