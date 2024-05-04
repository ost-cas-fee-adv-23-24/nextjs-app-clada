'use client';
import { GetPosts, GetPostsParams } from '@/app/api/actions/post.actions';
import { Config } from '@/config/env';
import { Post, PostPaginatedResult } from '@/utils/models';
import { useEffect, useState } from 'react';
import { SinglePost } from '../post/single-post';
// inspiration from https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
import { IconButton, RepostIcon } from 'clada-storybook';
import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';
import { CreatePost as FirstPost } from '../post/create-post';
import PostSkeleton from '../skeleton/post-skeleton';

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
    const evtSource = new EventSource(`${Config.apiUrl}/posts/_sse`);

    evtSource.addEventListener('postCreated', (e) => {
      const newPost: Post = JSON.parse(e.data) as Post;

      if (newPost.creator.id === session?.user.id) {
        setPosts((posts) => [newPost, ...posts]);
      } else {
        setNewPosts([newPost, ...newPosts]);
        setHasNewPostData(true);
      }
    });

    return () => {
      evtSource.close();
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
        <div className='flex justify-end mt-[-32px]'>
          <IconButton
            Icon={RepostIcon}
            href='javascript:void(0);'
            variant='primary'
            onClick={refresh}
          >
            Click to add brand new posts!
          </IconButton>
          <div className='pt-l'></div>
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
