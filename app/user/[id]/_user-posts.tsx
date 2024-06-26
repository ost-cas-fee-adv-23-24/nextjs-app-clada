'use client';

import { GetPosts, GetPostsParams } from '@/actions/post.actions';
import PostList from '@/post/post-list/post-list';
import { UserPostsContext } from '@/post/user-posts-context';
import { Friends } from '@/user/friends';
import { PostPaginatedResult } from '@/utils/models';
import { Tabs } from 'clada-storybook';
import { Config } from 'config/env';
import { useContext, useEffect, useState } from 'react';
import { UserPageSection } from './const';

type QueryParams =
  | (GetPostsParams & Omit<GetPostsParams, 'offset'>)
  | undefined;

export const UserDashboard = ({
  userId,
  isPersonalUser,
  postsPaginatedResult,
  queryParams,
}: {
  userId: string;
  isPersonalUser: boolean;
  postsPaginatedResult: PostPaginatedResult | null;
  queryParams?: QueryParams;
}) => {
  const [currentPaginatedResult, setCurrentPaginatedResult] =
    useState<PostPaginatedResult | null>(postsPaginatedResult);
  const [currentQueryParams, setCurrentQueryParams] =
    useState<QueryParams>(queryParams);

  const [showFriends, setShowFriends] = useState(false);
  const [title, setTitle] = useState(UserPageSection.CreatedByUser);

  const onSectionChange = async (section: UserPageSection) => {
    const temporaryQueryParam: QueryParams = {};

    setTitle(section);

    switch (section) {
      case UserPageSection.CreatedByUser:
        temporaryQueryParam.creators = [userId];
        await handleSearch(temporaryQueryParam);
        break;
      case UserPageSection.LikedByUser:
        temporaryQueryParam.likedBy = [userId];
        await handleSearch(temporaryQueryParam);
        break;
      case UserPageSection.Friends:
        if (!showFriends) {
          setShowFriends(true);
        }
        break;
    }
  };

  const { reloadTrigger } = useContext(UserPostsContext);

  useEffect(() => {
    handleSearch(currentQueryParams);
  }, [reloadTrigger]);

  const handleSearch = async (param: QueryParams) => {
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
        <div data-testid='user-tabs'>
          <h2 className='sr-only'>{title}</h2>
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
        </div>
      )}
      {isPersonalUser && showFriends ? (
        <div className='min-h-[680px]'>
          <Friends userId={userId}></Friends>
        </div>
      ) : (
        <section>
          <PostList
            postsPaginatedResult={currentPaginatedResult}
            queryParams={currentQueryParams}
            isPersonalUser={isPersonalUser}
          />
        </section>
      )}
    </>
  );
};
