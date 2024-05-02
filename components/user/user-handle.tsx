'use client';

import { IconButton, ProfileIcon } from 'clada-storybook';
import Link from 'next/link';

export const UserHandle = ({ id, name }: { id: string; name: string }) => {
  return (
    <div>
      <IconButton Icon={ProfileIcon} href={`/user/${id}`} linkComponent={Link}>
        {name}
      </IconButton>
    </div>
  );
};
