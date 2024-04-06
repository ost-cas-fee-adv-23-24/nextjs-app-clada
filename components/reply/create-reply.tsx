'use client';

import { Post } from '@/utils/models';
import { CreateContent } from '../post/create-content';
import { UserHeader } from '../user/user-header';

export const CreateReplyComponent = ({ post }: { post: Post }) => {
  const placeholder = 'Und was meinst du dazu?';
  return (
    <div>
      <UserHeader post={post}></UserHeader>
      <CreateContent post={post} placeholder={placeholder}></CreateContent>
    </div>
  );
};
