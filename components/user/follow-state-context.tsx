export interface FollowState {
  [userId: string]: boolean;
}

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

const initialFollowState: FollowState = {};

const FollowStateContext = createContext<FollowState>(initialFollowState);
const FollowStateUpdateContext = createContext<
  Dispatch<SetStateAction<FollowState>>
>(() => {});

export const useFollowState = () => useContext(FollowStateContext);
export const useFollowStateUpdate = () => useContext(FollowStateUpdateContext);

export const FollowStateProvider = ({ children }: { children: ReactNode }) => {
  const [followState, setFollowState] =
    useState<FollowState>(initialFollowState);

  return (
    <FollowStateContext.Provider value={followState}>
      <FollowStateUpdateContext.Provider value={setFollowState}>
        {children}
      </FollowStateUpdateContext.Provider>
    </FollowStateContext.Provider>
  );
};
