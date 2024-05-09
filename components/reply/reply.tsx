'use client';

import { InteractionStrip } from '@/shared/interaction/interaction-strip';
import ZoomImage from '@/shared/zoom-image';
import { UserHeader } from '@/user/user-header';
import { PostReply } from '@/utils/models';

export const Reply = ({ reply }: { reply: PostReply }) => {
  return (
    <article className='pr-xl pl-xl  pt-l pb-l relative w-full border-b-1 border-base-100 bg-white text-base-600 last:rounded-b-m'>
      <div className='flex'>
        <UserHeader post={reply} showTime={true} noTimeLink={true}></UserHeader>
      </div>

      <div className='mt-s text-black'>{reply.text}</div>
      <ZoomImage src={reply.mediaUrl}></ZoomImage>
      <div className='pt-s'></div>
      <InteractionStrip post={reply} reduced={true}></InteractionStrip>
    </article>
  );
};
