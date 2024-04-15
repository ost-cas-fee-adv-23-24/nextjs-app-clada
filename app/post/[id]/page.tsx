import { GetPostById, GetPostReplies } from '@/app/api/actions/post.actions';
import { PostContent } from '@/components/post/post-content';
import { CreateReplyComponent } from '@/components/reply/create-reply';
import { Reply } from '@/components/reply/reply';
import { Post } from '@/utils/models';

export default async function Detail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const detailedPost = await GetPostById(params.id);
  const replies = await GetPostReplies(params.id);

  return (
    <div className={'w-full'}>
      {detailedPost && (
        <div>
          <div className='pt-s'></div>
          <div className='relative w-full rounded-t-m bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
            <PostContent post={detailedPost} size='large'></PostContent>
          </div>

          <div className='relative w-full bg-white pb-l pl-xl pr-xl pt-l text-base-600 last:rounded-b-m'>
            <CreateReplyComponent post={detailedPost}></CreateReplyComponent>
          </div>

          {replies &&
            replies.data?.map((post: Post) => (
              <Reply key={post.id} reply={post}></Reply>
            ))}
        </div>
      )}
    </div>
  );
}
