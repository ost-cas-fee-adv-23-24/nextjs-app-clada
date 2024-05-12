import { User } from '@/utils/models';

export const getName = (user?: User) => {
  if (!user) {
    return 'Anonymous';
  }

  const displayedName =
    !user.firstname || !user.lastname
      ? user.username
      : `${user?.firstname} ${user.lastname}`;

  return displayedName;
};
