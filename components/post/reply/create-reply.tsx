'use client';

import { CreateContent } from '@/post/create-content';
import { UserHeader } from '@/user/user-header';
import { useAuthSession } from '@/utils/hooks/swr-hooks';
import { Post } from '@/utils/models';
import { useEffect, useState } from 'react';

export const CreateReplyComponent = ({ post }: { post: Post }) => {
  const placeholder = 'Und was meinst du dazu?';

  const [currentUserId, setCurrentUserId] = useState('user');

  const { session: session } = useAuthSession();

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
