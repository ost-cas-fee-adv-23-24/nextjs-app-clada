'use server';

import { httpRequest } from '@/utils/api/request';
import { validate } from '@/utils/api/validation';
import { ValidationError, parseValidationError } from '@/utils/error';
import {
  Post,
  PostPaginatedResult,
  PostReply,
  ReplyPaginatedResult,
} from '@/utils/models';
import { revalidatePath, revalidateTag } from 'next/cache';

export type GetPostsParams = {
  newerThan?: string;
  olderThan?: string;
  text?: string;
  tags?: string[];
  creators?: string[];
  likedBy?: string[];
  offset?: number;
  limit?: number;
};

export const GetPosts = async (queryParams?: GetPostsParams) => {
  const tag = queryParams?.toString() ?? 'never';

  const response = await httpRequest<PostPaginatedResult>(
    '/posts',
    {
      method: 'GET',
      next: {
        revalidate: 1200,
        tags: [tag],
      },
    },
    queryParams
  );

  return response;
};

export const GetPostById = async (id: string) => {
  const response = await httpRequest<Post>(`/posts/${id}`, {
    method: 'GET',
  });

  return response;
};

export const GetPostReplies = async (id: string) => {
  const response = await httpRequest<ReplyPaginatedResult>(
    `/posts/${id}/replies`,
    {
      method: 'GET',
    }
  );

  return response;
};

export const CreatePost = async (
  data: FormData,
  userId?: string
): Promise<Post | ValidationError> => {
  const validation = validate(data);

  if (!validation.success) {
    return parseValidationError(validation);
  }

  const post = await httpRequest<Post>('/posts', {
    method: 'POST',
    body: data,
  });

  revalidatePath('/', 'page');

  revalidatePosts(userId);

  return post as Post;
};

export const UpdatePost = async (id: string, data: FormData) => {
  const validation = validate(data);

  if (!validation.success) {
    return Promise.reject(parseValidationError(validation));
  }

  await httpRequest<void>(`/posts/${id}`, {
    method: 'PUT',
    body: data,
  });
};

export const UpdateMedia = async (id: string, data: FormData) => {
  const validation = validate(data);

  if (!validation.success) {
    return Promise.reject(validation.error.flatten().fieldErrors);
  }

  await httpRequest(`/posts/${id}/media`, {
    method: 'PUT',
    body: data,
  });
};

export const DeletePost = async (id: string, userId: string) => {
  await httpRequest<void>(`/posts/${id}`, {
    method: 'DELETE',
  });

  revalidatePosts(userId);
};

export const CreateReply = async (
  id: string,
  data: FormData
): Promise<PostReply | ValidationError> => {
  const validation = validate(data);

  if (!validation.success) {
    return parseValidationError(validation);
  }

  const reply = await httpRequest<PostReply>(`/posts/${id}/replies`, {
    method: 'POST',
    body: data,
  });

  revalidatePath('/', 'page');

  return reply as PostReply;
};

export const UpdateLike = async (
  id: string,
  isAlreadyLikedByUser: boolean = false
) => {
  await httpRequest(`/posts/${id}/likes`, {
    method: !isAlreadyLikedByUser ? 'PUT' : 'DELETE',
  });
};

const revalidatePosts = (userId: string) => {
  revalidatePath('/', 'page');
  revalidateTag({ creators: [userId] }.toString());
  revalidatePath(`/user/${userId}`, 'page');
};
