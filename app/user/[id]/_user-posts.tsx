'use client';

import { GetPosts, GetPostsParams } from '@/app/api/actions/post.actions';
import { GetUserFollowees, GetUsers } from '@/app/api/actions/user.actions';
import PostList from '@/components/post-list/post-list';
import { RecommendedUsers } from '@/components/user/recommended-users';
import { Config } from '@/config/env';
import { PostPaginatedResult, User } from '@/utils/models';
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

  const [showFriends, setShowFriends] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [followees, setFollowees] = useState<Array<User>>([]);

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
        handleFriends();
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

  const handleFriends = async () => {
    const loadedUsers = (await GetUsers()).data
      .filter((x) => x.id !== userId)
      .slice(-6);

    setUsers(loadedUsers as Array<User>);

    const loadedFollowees = userId ? (await GetUserFollowees(userId)).data : [];
    setFollowees(loadedFollowees);

    if (!showFriends) {
      setShowFriends(true);
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
        <div>
          <div className='pt-s'></div>
          <RecommendedUsers
            users={users}
            followees={followees}
          ></RecommendedUsers>
          <div className='pt-s'></div>
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
