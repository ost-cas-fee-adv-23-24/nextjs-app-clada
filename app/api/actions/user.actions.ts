'use server';

import { httpRequest } from '@/utils/api/request';
import { validateUser } from '@/utils/api/validation';
import { schemaUser } from '@/utils/api/validation.schema';
import { parseValidationError } from '@/utils/error';
import { UpdateUserData, User, UserPaginatedResult } from '@/utils/models';

export const GetUsers = async (): Promise<UserPaginatedResult> => {
  const response = await httpRequest<UserPaginatedResult>('/users', {
    method: 'GET',
  });

  // todo: check if needs revalidation

  return response as UserPaginatedResult;
};

export const GetUserById = async (id?: string): Promise<User | undefined> => {
  if (!id) {
    return Promise.resolve(undefined);
  }

  const response = await httpRequest<User>(`/users/${id}`, {
    method: 'GET',
    next: {
      revalidate: 3600,
    },
  });

  // todo: check if needs revalidation

  return response as User;
};

export const GetUserFollowers = async (
  id: string
): Promise<UserPaginatedResult> => {
  const response = await httpRequest<UserPaginatedResult>(
    `/users/${id}/followers`,
    {
      method: 'GET',
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response) {
    throw new Error('No followers found');
  }

  return response;
};

export const GetUserFollowees = async (
  id: string
): Promise<UserPaginatedResult> => {
  const response = await httpRequest<UserPaginatedResult>(
    `/users/${id}/followees`,
    {
      method: 'GET',
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response) {
    throw new Error('No followers found');
  }

  return response;
};

export const DeleteUserAvatar = async (): Promise<void> => {
  await httpRequest<void>('/users/avatar', {
    method: 'DELETE',
  });

  // todo: check if needs revalidation
};

export const UpdateUserAvatar = async (data: FormData) => {
  const validation = validateUser(data);

  if (!validation.success) {
    return Promise.reject(parseValidationError(validation));
  }

  await httpRequest<void>('/users/avatar', {
    method: 'PUT',
    body: data,
  });

  // todo: check if needs revalidation
};

export const UpdateUser = async (
  data: UpdateUserData
): Promise<void | { errors: any }> => {
  console.log(JSON.stringify(data));
  const validation = schemaUser.safeParse(data);

  if (!validation.success) {
    return Promise.reject(parseValidationError(validation));
  }

  await httpRequest('/users', {
    method: 'PATCH',
    body: data,
  });

  // todo: check if needs revalidation
};

export const FollowUser = async (id: string) => {
  await httpRequest(`/users/${id}/followers`, {
    method: 'PUT',
  });

  // todo: check if needs revalidation
};

export const UnfollowUser = async (id: string) => {
  await httpRequest(`/users/${id}/followers`, {
    method: 'PUT',
  });

  // todo: check if needs revalidation
};
