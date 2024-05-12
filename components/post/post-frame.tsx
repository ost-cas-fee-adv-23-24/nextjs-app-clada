import { Post } from '@/utils/models';
import { ReactNode } from 'react';

export const PostFrame = ({
  post,
  hasHover = true,
  showUser = true,
  children,
}: {
  post?: Post;
  hasHover?: boolean;
  showUser?: boolean;
  children: ReactNode;
}) => {
  const hoverClasses = `transition-all duration-300 hover:ring-2 hover:ring-base-200`;
  const containerClasses = `${hasHover && hoverClasses} relative w-full rounded-m border-base-200 bg-white pb-l pl-xl pr-xl pt-l text-base-600 `;

  return (
    <article className={containerClasses} data-testid='single-post'>
      <div>{children}</div>
    </article>
  );
};
