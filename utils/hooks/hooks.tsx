import { GetUserById } from '@/app/api/actions/user.actions';
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
