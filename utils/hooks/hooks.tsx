import {
  GetUserById,
  GetUserFollowees,
  GetUserFollowers,
  GetUsers,
} from '@/app/api/actions/user.actions';
import useSWR from 'swr';

export const useUser = (id: string | undefined) => {
  const { data, error, isLoading } = useSWR(`user-${id}`, () => {
    if (id) {
      return GetUserById(id);
    }
  });

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

export const useUsers = () => {
  const { data, error, isLoading } = useSWR(`users`, async () => {
    return GetUsers();
  });

  return {
    users: data?.data,
    isLoading,
    isError: error,
  };
};

export const useFollowees = (id: string) => {
  const { data, error, isLoading } = useSWR(`followees-${id}`, async () => {
    return GetUserFollowees(id);
  });

  return {
    followees: data?.data,
    isLoading,
    isError: error,
  };
};

export const useFollowers = (id: string) => {
  const { data, error, isLoading } = useSWR(`followers-${id}`, async () => {
    return GetUserFollowers(id);
  });

  return {
    followers: data?.data,
    isLoading,
    isError: error,
  };
};
