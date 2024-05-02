'use client';
import { ReactNode, createContext, useCallback, useState } from 'react';

interface IContext {
  reloadData: () => void;
  reloadTrigger: number;
  isProvided?: boolean;
}

export const UserPostsContext = createContext<IContext>({
  // triggered outside of context which is intentionally and gracefully ignored
  reloadData: () => {},
  reloadTrigger: 0,
  isProvided: false,
});

export const UserPostsProvider = ({ children }: { children: ReactNode }) => {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadData = useCallback(() => {
    setReloadTrigger((oldTrigger: number) => oldTrigger + 1);
  }, []);

  return (
    <UserPostsContext.Provider
      value={{ reloadData, reloadTrigger, isProvided: true }}
    >
      {children}
    </UserPostsContext.Provider>
  );
};
