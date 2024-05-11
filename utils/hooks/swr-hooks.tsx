import {
  GetUserById,
  GetUserFollowees,
  GetUserFollowers,
  GetUsers,
} from '@/actions/user.actions';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import useSWR, { Fetcher } from 'swr';

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

const fetcher: Fetcher<Session | null> = (url: string) =>
  fetch(url).then((res) => res.json());

export function useAuthSession() {
  const { data: session, status } = useSession();

  const { data: sessionData, error } = useSWR<Session | null>(
    '/api/auth/session',
    fetcher,
    {
      fallbackData: session,
      revalidateOnFocus: true,
    }
  );

  return {
    session: sessionData,
    isLoading: status === 'loading',
    isError: !!error,
  };
}
