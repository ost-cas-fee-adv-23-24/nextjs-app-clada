'use client';

import { Tabs } from 'clada-storybook';

export const UserTabs = () => {
  return (
    <Tabs
      tabs={[
        {
          onClick: function noRefCheck() {},
          text: 'Deine Mumbles',
        },
        {
          onClick: function noRefCheck() {},
          text: 'Deine Likes',
        },
      ]}
    />
  );
};
