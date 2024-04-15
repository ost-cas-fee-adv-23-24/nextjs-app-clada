'use client';

import { GetPosts, GetPostsParams } from '@/app/api/actions/post.actions';
import PostList from '@/components/post-list/post-list';
import { Config } from '@/config/env';
import { PostPaginatedResult } from '@/utils/models';
import { Tabs } from 'clada-storybook';
import { useState } from 'react';
import { UserPageSection } from './const';

type Props = {
  userId: string;
  isPersonalUser: boolean;
  postsPaginatedResult: PostPaginatedResult | null;
  queryParams?: GetPostsParams & Omit<GetPostsParams, 'offset'>;
};

type QueryParam = (GetPostsParams & Omit<GetPostsParams, 'offset'>) | undefined;

export const UserDashboardPosts = ({
  userId,
  isPersonalUser,
  postsPaginatedResult,
  queryParams,
}: Props) => {
  const [currentPaginatedResult, setCurrentPaginatedResult] =
    useState<PostPaginatedResult | null>(postsPaginatedResult);
  const [currentQueryParams, setCurrentQueryParams] =
    useState<QueryParam>(queryParams);

  const onSectionChange = async (section: UserPageSection) => {
    const temporaryQueryParam: QueryParam = {};
    switch (section) {
      case 'liked':
        temporaryQueryParam.likedBy = [userId];
        break;
      case 'created':
        temporaryQueryParam.creators = [userId];
        break;
    }

    const apiPosts = await GetPosts({
      offset: 0,
      limit: Config.defaultPageSize,
      ...temporaryQueryParam,
    });

    setCurrentQueryParams(temporaryQueryParam);
    setCurrentPaginatedResult(apiPosts);
  };

  return (
    <>
      {isPersonalUser && (
        <>
          <Tabs
            tabs={[
              {
                onClick: () => onSectionChange(UserPageSection.CreatedByUser),
                text: 'Deine Mumbles',
              },
              {
                onClick: () => onSectionChange(UserPageSection.LikedByUser),
                text: 'Deine Likes',
              },
            ]}
          />
          <div className='pt-l'></div>
        </>
      )}
      <PostList
        postsPaginatedResult={currentPaginatedResult}
        queryParams={currentQueryParams}
      />
    </>
  );
};
