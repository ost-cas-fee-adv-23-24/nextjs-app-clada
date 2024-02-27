'use server';
import { APIBase } from '@/utils/api/base';
import { ApiRoutes, RouteService } from '@/utils/api/route-service';
import { validate } from '@/utils/api/validation';
import {
  PublicUser,
  UpdateUserData,
  UserPaginatedResult,
} from '@/utils/models';

export const GetUsers = async (): Promise<UserPaginatedResult> => {
  const response = await APIBase.fetch(RouteService.api(ApiRoutes.Users), {
    method: 'GET',
  });
  return (await response.json()) as UserPaginatedResult;
};

export const GetUserById = async (payload: {
  id: string;
}): Promise<PublicUser> => {
  const response = await APIBase.fetch(
    RouteService.api(ApiRoutes.UserId, { id: payload.id }),
    {
      method: 'GET',
    }
  );

  return (await response.json()) as PublicUser;
};

export const GetUserFollowers = async (payload: {
  id: string;
}): Promise<UserPaginatedResult> => {
  const response = await APIBase.fetch(
    RouteService.api(ApiRoutes.UserFollowers, { id: payload.id }),
    {
      method: 'GET',
      next: {
        revalidate: 300,
      },
    }
  );

  return (await response.json()) as UserPaginatedResult;
};

export const GetUserFollowees = async (payload: {
  id: string;
}): Promise<UserPaginatedResult> => {
  const response = await APIBase.fetch(
    RouteService.api(ApiRoutes.UserFollowees, { id: payload.id }),
    {
      method: 'GET',
    }
  );

  return (await response.json()) as UserPaginatedResult;
};

export const deleteUserAvatar = async (): Promise<void> => {
  await APIBase.fetch(RouteService.api(ApiRoutes.UserAvatar), {
    method: 'DELETE',
  });
};

export const updateUserAvatar = async (payload: { data: FormData }) => {
  const { data } = payload;
  const validation = validate(data);

  if (!validation.success) {
    return Promise.reject(validation.error.flatten().fieldErrors);
  }

  await APIBase.fetch(RouteService.api(ApiRoutes.UserAvatar), {
    method: 'PUT',
    body: data,
  });
};

export const updateUser = async (payload: { data: UpdateUserData }) => {
  const { data } = payload;
  const validation = validate(data);

  if (!validation.success) {
    return Promise.reject(validation.error.flatten().fieldErrors);
  }

  await APIBase.fetch(RouteService.api(ApiRoutes.Users), {
    method: 'PATCH',
    body: data,
  });
};

export const followUser = async (payload: { id: string }) => {
  await APIBase.fetch(
    RouteService.api(ApiRoutes.UserFollowers, { id: payload.id }),
    {
      method: 'PUT',
    }
  );
};

export const unfollowUser = async (payload: { id: string }) => {
  await APIBase.fetch(
    RouteService.api(ApiRoutes.UserFollowers, { id: payload.id }),
    {
      method: 'DELETE',
    }
  );
};
