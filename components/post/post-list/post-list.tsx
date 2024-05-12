'use client';
import {
  GetPosts,
  GetPostsParams,
  revalidateHomePosts,
} from '@/actions/post.actions';
import { SinglePost } from '@/post/single-post';
import { Post, PostPaginatedResult } from '@/utils/models';
import { Config } from 'config/env';
import { useEffect, useState } from 'react';
// inspiration from https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
import { CreatePost as FirstPost } from '@/post/create-post';
import PostSkeleton from '@/post/skeleton/post-skeleton';
import { useAuthSession } from '@/utils/hooks/swr-hooks';
import { IconButton, RepostIcon } from 'clada-storybook';
import { useInView } from 'react-intersection-observer';

export default function PostList({
  postsPaginatedResult,
  queryParams,
  isPersonalUser = false,
  showRefresh = false,
}: {
  postsPaginatedResult: PostPaginatedResult | null;
  queryParams?: GetPostsParams & Omit<GetPostsParams, 'offset'>;
  isPersonalUser?: boolean;
  showRefresh?: boolean;
}) {
  const [maxPostsCount, setMaxPostsCount] = useState(
    postsPaginatedResult?.count ?? 0
  );
  const [posts, setPosts] = useState<Post[]>(
    postsPaginatedResult?.data as Post[]
  );

  const [allPostsLoaded, setAllPostsLoaded] = useState<boolean>(false);
  const [staleEventSourcePosts, setStaleEventSourcePosts] = useState<
    Array<Post>
  >([]);

  const { ref, inView } = useInView();
  const { session: session } = useAuthSession();

  useEffect(() => {
    return () => {
      const shouldRevalidate = sessionStorage.getItem('shouldRevalidate');

      if (shouldRevalidate === 'true') {
        revalidateHomePosts();
        sessionStorage.removeItem('shouldRevalidate');
      }
    };
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`${Config.apiUrl}/posts/_sse`);

    const handlePostUpdate = (postId: string) => {
      if (posts.find((x) => x.id === postId)) {
        revalidateHomePosts();
      }
      sessionStorage.setItem('shouldRevalidate', 'true');
    };

    eventSource.addEventListener('postCreated', (e) => {
      const newPost: Post = JSON.parse(e.data) as Post;

      if (
        newPost.creator.id !== session?.user?.id &&
        (!queryParams ||
          !queryParams?.creators ||
          (queryParams.creators &&
            queryParams.creators.includes(newPost.creator.id)))
      ) {
        setStaleEventSourcePosts((posts) => [newPost, ...posts]);
      }

      sessionStorage.setItem('shouldRevalidate', 'true');
    });

    eventSource.addEventListener('postLiked', (e) =>
      handlePostUpdate(JSON.parse(e.data).postId)
    );
    eventSource.addEventListener('postUnliked', (e) =>
      handlePostUpdate(JSON.parse(e.data).postId)
    );
    eventSource.addEventListener('postDeleted', (e) =>
      handlePostUpdate(JSON.parse(e.data).postId)
    );
    eventSource.addEventListener('postUpdated', (e) =>
      handlePostUpdate(JSON.parse(e.data).postId)
    );

    return () => {
      eventSource.close();
    };
  }, [session?.user.id]);

  const loadMorePosts = async () => {
    if (!allPostsLoaded) {
      const apiPosts = await GetPosts({
        olderThan: posts[posts.length - 1].id,
        limit: Config.defaultPageSize,
        ...queryParams,
      });

      setPosts([...posts, ...(apiPosts?.data as Post[])]);
      setAllPostsLoaded(posts.length === maxPostsCount);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  useEffect(() => {
    setPosts(postsPaginatedResult?.data as Post[]);
    setMaxPostsCount(postsPaginatedResult?.count ?? 0);
  }, [postsPaginatedResult]);

  const refresh = () => {
    setPosts([...staleEventSourcePosts, ...posts]);
    setStaleEventSourcePosts([]);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return false;
  };

  if (posts?.length === 0) {
    return (
      <>
        {isPersonalUser ? (
          <FirstPost
            label='Voll leer hier... 🥹'
            subtitle='Verfasse deinen ersten Mumble oder folge anderen Usern!'
            placeholder='Und was meinst du dazu?'
            showUser={false}
          ></FirstPost>
        ) : (
          <>No Results</>
        )}
      </>
    );
  }

  return (
    <>
      {showRefresh && staleEventSourcePosts.length > 0 && (
        <div className='sticky top-[84px] z-50'>
          <div className='flex justify-around mt-[-32px]'>
            <div
              className='bg-base-100 p-xs rounded-full cursor-pointer'
              aria-live='polite'
              aria-atomic='true'
            >
              <IconButton
                Icon={RepostIcon}
                href='javascript:void(0);'
                variant='primary'
                onClick={refresh}
              >
                Neue Posts laden
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id}>
          <SinglePost post={post} />
          <div className='pt-l'></div>
        </div>
      ))}
      {!allPostsLoaded ? (
        <>
          <div ref={ref} data-testid='post-list-loading-indicator'>
            <PostSkeleton />
          </div>
        </>
      ) : (
        <>
          <p>Alle Posts wurden geladen.</p>
        </>
      )}
    </>
  );
}
