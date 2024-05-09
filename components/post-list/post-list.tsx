'use client';
import { GetPosts, GetPostsParams } from '@/actions/post.actions';
import { SinglePost } from '@/components/post/single-post';
import { Post, PostPaginatedResult } from '@/utils/models';
import { Config } from 'config/env';
import { useEffect, useState } from 'react';
// inspiration from https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
import { CreatePost as FirstPost } from '@/components/post/create-post';
import PostSkeleton from '@/components/skeleton/post-skeleton';
import { IconButton, RepostIcon } from 'clada-storybook';
import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';

type Props = {
  postsPaginatedResult: PostPaginatedResult | null;
  queryParams?: GetPostsParams & Omit<GetPostsParams, 'offset'>;
};

export default function PostList({
  postsPaginatedResult,
  queryParams,
  isPersonalUser = false,
}: {
  postsPaginatedResult: PostPaginatedResult | null;
  queryParams?: GetPostsParams & Omit<GetPostsParams, 'offset'>;
  isPersonalUser?: boolean;
}) {
  const [maxPostsCount, setMaxPostsCount] = useState(
    postsPaginatedResult?.count ?? 0
  );
  const [posts, setPosts] = useState<Post[]>(
    postsPaginatedResult?.data as Post[]
  );

  const [newPosts, setNewPosts] = useState<Array<Post>>([]);
  const [hasNewPostData, setHasNewPostData] = useState(false);

  const { ref, inView } = useInView();
  const [allPostsLoaded, setAllPostsLoaded] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    const eventSource = new EventSource(`${Config.apiUrl}/posts/_sse`);

    eventSource.addEventListener('postCreated', (e) => {
      const newPost: Post = JSON.parse(e.data) as Post;

      if (newPost.creator.id === session?.user.id) {
        setPosts((posts) => [newPost, ...posts]);
      } else {
        setNewPosts([newPost, ...newPosts]);
        setHasNewPostData(true);
      }
    });

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
    setPosts((posts) => [...newPosts, ...posts]);
    setHasNewPostData(false);

    window.scrollTo(0, 0);

    return false;
  };

  if (posts?.length === 0) {
    return (
      <>
        {isPersonalUser ? (
          <FirstPost
            label='Voll leer hier 😲'
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
      {hasNewPostData && (
        <div className='sticky top-[84px] z-50'>
          <div className='flex justify-around mt-[-32px]'>
            <div className='bg-base-100 p-xs rounded-full cursor-pointer'>
              <IconButton
                Icon={RepostIcon}
                href='javascript:void(0);'
                variant='primary'
                onClick={refresh}
              >
                Refresh
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
