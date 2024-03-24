'use client';

import { Avatar, AvatarEdit } from 'clada-storybook';

export const UserImage = ({
  border = false,
  editable = false,
  size = 'm',
  hoverEffect = false,
  url,
}: {
  border?: boolean;
  editable?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
  hoverEffect?: boolean;
  url?: string;
}) => {
  const avatarProps = {
    size,
    noBorder: !border,
    ...(url && { imageProps: { alt: 'User Image', src: url } }),
  };

  const onClick = () => {
    alert('edit');
  };

  return editable ? (
    <AvatarEdit {...avatarProps} editOnClick={onClick} />
  ) : (
    <Avatar {...avatarProps} hoverEffect={hoverEffect ? 'all' : undefined} />
  );
};
