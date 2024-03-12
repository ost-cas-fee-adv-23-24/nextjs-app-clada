'use client';

import { EyeIcon, Button, Textarea, SendIcon } from 'clada-storybook';
import { UserImage } from '../shared/user-image';
import { UserHandle } from '../user/user-handle';

export const CreateReply = () => {
  return (
    <div>
      <div className='flex'>
        <div className='mr-xs'>
          <UserImage size='s' border={false}></UserImage>
        </div>
        <div>
          <div className='mb-xs mb-font-label-m'>John D. Mumble</div>
          <div className='flex'>
            <div>
              <UserHandle name='John D. Mumble'></UserHandle>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-s'></div>
      <Textarea
        id='text'
        name='text'
        placeholder='Und was meinst du dazu?'
      ></Textarea>
      <div className='pt-s'></div>
      <div className='flex'>
        <Button
          color='base'
          Icon={EyeIcon}
          label='Bild hochladen'
          size='m'
          onClick={() => false}
        ></Button>
        <div className='pr-s'></div>
        <Button
          color='primary'
          Icon={SendIcon}
          label='Absenden'
          size='m'
          onClick={() => false}
        ></Button>
      </div>
    </div>
  );
};
