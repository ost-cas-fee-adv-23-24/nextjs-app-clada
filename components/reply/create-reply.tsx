'use client';

import { CreateReply } from '@/app/api/actions/post.actions';
import { Post } from '@/utils/models';
import { useRef } from 'react';
import { CreateContent } from '../post/create-content';
import { UserHeader } from '../user/user-header';

export const CreateReplyComponent = ({ post }: { post: Post }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const createReply = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      await CreateReply(post.id, formData);
      formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={createReply} method='post'>
      <UserHeader post={post}></UserHeader>
      <CreateContent></CreateContent>
    </form>
  );
};
