'use client';

import { UpdateUserAvatar } from '@/actions/user.actions';
import { ImageUpload } from '@/components/modals/image-upload';
import { Avatar, AvatarEdit } from 'clada-storybook';
import { useState } from 'react';

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
  const [showImageUpload, setShowImageUpload] = useState(false);

  const onClick = () => {
    setShowImageUpload(true);
  };

  const handleCloseImageUpload = async (file?: File) => {
    const formData = new FormData();

    if (file) {
      formData.append('media', file);
      formData.append('text', file.name);

      try {
        await UpdateUserAvatar(formData, document.location.pathname);
      } catch (error) {
        console.error('Failed to update user:', error);
        setShowImageUpload(false);
      }
    }

    setShowImageUpload(false);
  };

  return editable ? (
    <div data-testid="user-avatar-with-image-upload">
      <AvatarEdit {...avatarProps} editOnClick={onClick} />
      <ImageUpload
        isShown={showImageUpload}
        onClose={handleCloseImageUpload}
      ></ImageUpload>
    </div>
  ) : (
    <div data-testid="user-avatar-without-image-upload">
      <Avatar {...avatarProps} hoverEffect={hoverEffect ? 'all' : undefined} />
    </div>
  );
};
