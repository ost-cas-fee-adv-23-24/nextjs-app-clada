import PostSkeleton from '@/components/skeleton/post-skeleton';
import { Config } from '@/config/env';

export default function PostSkeletonList({ count }: { count?: number }) {
  const definiteCount = count ? count : Config.defaultPageSize;
  return (
    <section>
      {[...Array(definiteCount)].map((x, i) => (
        <PostSkeleton key={i} />
      ))}
    </section>
  );
}
