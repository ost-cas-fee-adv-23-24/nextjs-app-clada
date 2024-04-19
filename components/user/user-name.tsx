'use client';
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

  const className = `mb-xs ${useLarge ? 'mb-font-label-l' : 'mb-font-label-m'}`;

  return <div className={className}>{displayedName}</div>;
};
