import { Post, PostPaginatedResult } from '@/utils/models';
import { SinglePost } from '../post/single-post';
import { Button } from 'clada-storybook';

type Props = {
    posts: PostPaginatedResult;
    loadMoreFun: () => void
};

export const PostList = ({ posts, loadMoreFun }: Props) => {
    return (
        <>
            {posts?.data?.map((post, index: number) => (
                <div key={index}>
                    <SinglePost post={post} />
                    <div className='pt-l'></div>
                </div>
            ))}
            {/* <div>
                <Button color='base' onClick={loadMoreFun} label='Mehr...' size='m' />
            </div> */}
        </>
    );
};
