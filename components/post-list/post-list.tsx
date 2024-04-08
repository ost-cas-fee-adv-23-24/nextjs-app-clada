'use client';
import { GetPosts, GetPostsParams } from '@/app/api/actions/post.actions';
import { Post, PostPaginatedResult } from '@/utils/models';
import { useEffect, useState } from 'react';
import { SinglePost } from '../post/single-post';
// inspiration from https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
import { Config } from '@/config/env';
import { useInView } from 'react-intersection-observer';
import PostSkeleton from '../skeleton/post-skeleton';

type Props = {
  postsPaginatedResult: PostPaginatedResult | null;
  queryParams?: GetPostsParams & Omit<GetPostsParams, 'offset'>;
};

export default function PostList({ postsPaginatedResult, queryParams }: Props) {
  const [maxPostsCount, setMaxPostsCount] = useState(
    postsPaginatedResult?.count ?? 0
  );
  const [posts, setPosts] = useState<Post[]>(
    postsPaginatedResult?.data as Post[]
  );
  const [offset, setOffset] = useState<number>(0);
  const { ref, inView } = useInView();
  const [allPostsLoaded, setAllPostsLoaded] = useState<boolean>(false);

  const loadMorePosts = async () => {
    if (!allPostsLoaded) {
      const apiPosts = await GetPosts({
        offset: offset,
        limit: Config.defaultPageSize,
        ...queryParams,
      });

      const newOffset = offset + Config.defaultOffset;

      setPosts([...posts, ...(apiPosts?.data as Post[])]);
      setOffset(newOffset);
      setAllPostsLoaded(newOffset > maxPostsCount);
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

  if (posts?.length === 0) {
    return <>No Results</>;
  }

  return (
    <>
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
