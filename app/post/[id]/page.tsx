import { GetPostById, GetPostReplies } from '@/app/api/actions/post.actions';
import { SinglePost } from '@/components/post/single-post';
import { decodeULIDTimestamp } from '@/utils/api/ulid';
import { auth } from '../../api/auth/[...nextauth]/auth';

export default async function Detail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();

  const postId = decodeULIDTimestamp(params.id);
  const detailedPost = await GetPostById(params.id);
  const replies = await GetPostReplies(params.id);

  return (
    <div className={'w-full'}>
      <SinglePost post={detailedPost} replies={replies.data} />
    </div>
  );
}
