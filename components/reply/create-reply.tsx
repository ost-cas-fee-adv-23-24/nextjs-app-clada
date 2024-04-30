'use client';

import { Post } from '@/utils/models';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CreateContent } from '../post/create-content';
import { UserHeader } from '../user/user-header';

export const CreateReplyComponent = ({ post }: { post: Post }) => {
  const placeholder = 'Und was meinst du dazu?';

  const [currentUserId, setCurrentUserId] = useState('user');

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.id) {
      setCurrentUserId(session?.user.id);
    }
  }, [session?.user.id]);

  return (
    <div>
      <UserHeader
        post={post}
        currentUserId={currentUserId}
        useCurrentUser={true}
      ></UserHeader>
      <CreateContent post={post} placeholder={placeholder}></CreateContent>
    </div>
  );
};
