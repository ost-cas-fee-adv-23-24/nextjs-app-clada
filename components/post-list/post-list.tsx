import { PostPaginatedResult } from '@/utils/models';
import { SinglePost } from '../post/single-post';

type Props = {
  posts: PostPaginatedResult;
};

export const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts?.data?.map((post, index: number) => (
        <div key={index}>
          <SinglePost post={post} />
          <div className='pt-l'></div>
        </div>
      ))}
    </>
  );
};
