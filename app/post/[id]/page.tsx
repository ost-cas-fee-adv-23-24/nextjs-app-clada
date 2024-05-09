import { GetPostById, GetPostReplies } from '@/actions/post.actions';
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
      <h1 className='sr-only'>Detailansicht eines Beitrags</h1>

      {detailedPost && (
        <div>
          <h2 className='sr-only'>Beitrag</h2>

          <div className='pt-s'></div>
          <article className='relative w-full rounded-t-m bg-white pb-l pl-xl pr-xl pt-l text-base-600'>
            <PostContent post={detailedPost} size='large'></PostContent>
          </article>

          <div className='relative w-full bg-white pb-l pl-xl pr-xl pt-l text-base-600 last:rounded-b-m'>
            <h2 className='sr-only'>Deine Antwort</h2>
            <CreateReplyComponent post={detailedPost}></CreateReplyComponent>
          </div>

          {replies?.data?.length && <h2 className='sr-only'>Antworten</h2>}

          {replies?.data?.length &&
            replies.data?.map((post: Post) => (
              <Reply key={post.id} reply={post}></Reply>
            ))}
        </div>
      )}
    </div>
  );
}
