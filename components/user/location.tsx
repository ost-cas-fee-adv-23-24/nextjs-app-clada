'use client';

import { IconButton, LocationIcon } from 'clada-storybook';

export const Location = ({ name }: { name: string }) => {
  return (
    <div>
      <IconButton Icon={LocationIcon} href='/'>
        {name}
      </IconButton>
    </div>
  );
};
