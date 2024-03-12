'use client';

import { IconButton, ProfileIcon } from 'clada-storybook';

export const UserHandle = ({ name }: { name: string }) => {
  return (
    <div>
      <IconButton Icon={ProfileIcon} href='/'>
        {name}
      </IconButton>
    </div>
  );
};
