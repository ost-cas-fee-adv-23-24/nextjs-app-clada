'use client';

import { SettingsIcon } from 'clada-storybook';

export default function HeaderActionButton() {
  return (
    <button onClick={() => alert('Open settings')}>
      <div className='flex justify-center self-center'>
        <SettingsIcon color='white'></SettingsIcon>
      </div>
      <span className='text-white'>Settings</span>
    </button>
  );
}
