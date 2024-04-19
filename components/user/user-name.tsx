import { PrivateUser, User } from '@/utils/models';
import { useEffect, useState } from 'react';
import { getName } from './user-utils';

export const UserName = ({
  user,
  useLarge,
}: {
  user: User | PrivateUser;
  useLarge?: boolean;
}) => {
  const [displayedName, setDisplayedName] = useState(user.username);

  useEffect(() => {
    setDisplayedName(getName(user));
  }, [user]);

  return (
    <div>
      {useLarge ? (
        <div className='mb-xs mb-font-label-l'>{displayedName}</div>
      ) : (
        <div className='mb-xs mb-font-label-m'>{displayedName}</div>
      )}
    </div>
  );
};
