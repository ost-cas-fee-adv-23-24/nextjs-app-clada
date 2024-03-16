'use client';

import { PostReply } from '@/utils/models';
import { InteractionStrip } from '../shared/interaction-strip';
import { TimeDiff } from '../shared/time-diff';
import { UserImage } from '../shared/user-image';
import ZoomImage from '../shared/zoom-image';
import { UserHandle } from '../user/user-handle';

export const Reply = ({ reply }: { reply: PostReply }) => {
  return (
    <div className='relative w-full border-t-1 border-base-100 bg-white text-base-600'>
      <div className='flex'>
        <div className='mr-xs'>
          <UserImage
            size='s'
            border={false}
            url={reply?.creator?.avatarUrl}
          ></UserImage>
        </div>
        <div>
          <div className='mb-xs mb-font-label-m'>John D. Mumble</div>
          <div className='flex'>
            <div>
              <UserHandle
                name={reply.creator.username}
                id={reply.creator.id}
              ></UserHandle>
            </div>
            <div className='ml-s'>
              <TimeDiff ulid={reply.id}></TimeDiff>
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
