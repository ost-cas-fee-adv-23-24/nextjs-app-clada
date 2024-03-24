'use client';

import { IconButton, ProfileIcon } from 'clada-storybook';

export const UserHandle = ({ id, name }: { id: string; name: string }) => {
  return (
    <div>
      <IconButton Icon={ProfileIcon} href={`/user/${id}`}>
        {name}
      </IconButton>
    </div>
  );
};
