'use server';
// import { APIBase } from '@/utils/api/base';
import { httpRequest } from '@/utils/api/request';
import { validate } from '@/utils/api/validation';
import { parseValidationError } from '@/utils/error';
import {
  PublicUser,
  UpdateUserData,
  UserPaginatedResult,
} from '@/utils/models';

export const GetUsers = async (): Promise<UserPaginatedResult> => {
  const response = await httpRequest<UserPaginatedResult>('/users', {
    method: 'GET',
  });

  // todo: check if needs revalidation

  return response;
};

export const GetUserById = async (id: string): Promise<PublicUser> => {
  const response = await httpRequest<PublicUser>(`/users/${id}`, {
    method: 'GET',
  });

  // todo: check if needs revalidation

  return response;
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

  // todo: check if needs revalidation

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

  // todo: check if needs revalidation

  return response;
};

export const deleteUserAvatar = async (): Promise<void> => {
  await httpRequest<void>('/users/avatar', {
    method: 'DELETE',
  });

  // todo: check if needs revalidation
};

export const updateUserAvatar = async (data: FormData) => {
  const validation = validate(data);

  if (!validation.success) {
    return Promise.reject(parseValidationError(validation));
  }

  await httpRequest<void>('/users/avatar', {
    method: 'PUT',
    body: data,
  });

  // todo: check if needs revalidation
};

export const updateUser = async (data: UpdateUserData) => {
  const validation = validate(data);

  if (!validation.success) {
    return Promise.reject(parseValidationError(validation));
  }

  await httpRequest('/users', {
    method: 'PATCH',
    body: data,
  });

  // todo: check if needs revalidation
};

export const followUser = async (id: string) => {
  await httpRequest(`/users/${id}/followers`, {
    method: 'PUT',
  });

  // todo: check if needs revalidation
};

export const unfollowUser = async (id: string) => {
  await httpRequest(`/users/${id}/followers`, {
    method: 'PUT',
  });

  // todo: check if needs revalidation
};
