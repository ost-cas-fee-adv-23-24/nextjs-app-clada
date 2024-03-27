import { User } from '@/utils/models';

export const getName = (user: User | undefined) => {
  if(!user) {
    return 'Amongus'
  }

  const displayedName =
    !user.firstname || !user.lastname
      ? user.username
      : `${user?.firstname} ${user.lastname}`;

  return displayedName;
};
