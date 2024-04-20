'use client';

import { GetPosts, GetPostsParams } from '@/app/api/actions/post.actions';
import PostList from '@/components/post-list/post-list';
import { Friends } from '@/components/user/friends';
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

export const UserDashboard = ({
  userId,
  isPersonalUser,
  postsPaginatedResult,
  queryParams,
}: Props) => {
  const [currentPaginatedResult, setCurrentPaginatedResult] =
    useState<PostPaginatedResult | null>(postsPaginatedResult);
  const [currentQueryParams, setCurrentQueryParams] =
    useState<QueryParam>(queryParams);

  const [showFriends, setShowFriends] = useState(false);

  const onSectionChange = async (section: UserPageSection) => {
    const temporaryQueryParam: QueryParam = {};

    switch (section) {
      case UserPageSection.CreatedByUser:
        temporaryQueryParam.creators = [userId];
        handleSearch(temporaryQueryParam);
        break;
      case UserPageSection.LikedByUser:
        temporaryQueryParam.likedBy = [userId];
        handleSearch(temporaryQueryParam);
        break;
      case UserPageSection.Friends:
        if (!showFriends) {
          setShowFriends(true);
        }
        break;
    }
  };

  const handleSearch = async (param: QueryParam) => {
    const apiPosts = await GetPosts({
      offset: 0,
      limit: Config.defaultPageSize,
      ...param,
    });

    setCurrentQueryParams(param);
    setCurrentPaginatedResult(apiPosts);

    if (showFriends) {
      setShowFriends(false);
    }
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
              {
                onClick: () => onSectionChange(UserPageSection.Friends),
                text: 'Deine Freunde',
              },
            ]}
          />
          <div className='pt-l'></div>
        </>
      )}
      {isPersonalUser && showFriends ? (
        <div className='min-h-[680px]'>
          <Friends userId={userId}></Friends>
        </div>
      ) : (
        <PostList
          postsPaginatedResult={currentPaginatedResult}
          queryParams={currentQueryParams}
        />
      )}
    </>
  );
};
