'use client';

import { UserImage } from '../shared/user-image';
import { InteractionStrip } from '../shared/interaction-strip';
import { TimeDiff } from '../shared/time-diff';
import { UserHandle } from '../user/user-handle';
import NextImage from 'next/image';
import { FullscreenIcon } from 'clada-storybook';
import ZoomImage from '../shared/zoom-image';

export const Reply = ({ reply }: { reply: TPost }) => {
  return (
    <div className='relative w-full border-b-1 border-base-100 bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
      <div className='flex'>
        <div className='mr-xs'>
          <UserImage
            size='s'
            border={false}
            url={reply?.creator.avatarUrl}
          ></UserImage>
        </div>
        <div>
          <div className='mb-xs mb-font-label-m'>John D. Mumble</div>
          <div className='flex'>
            <div>
              <UserHandle name={reply.creator.username}></UserHandle>
            </div>
            <div className='ml-s'>
              <TimeDiff postId={reply.id}></TimeDiff>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-s text-black'>{reply.text}</div>
      <ZoomImage src={reply.mediaUrl}></ZoomImage>
      <InteractionStrip post={reply}></InteractionStrip>
    </div>
  );
};
