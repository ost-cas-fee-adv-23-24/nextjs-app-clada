import { ReactNode } from 'react';
import { UserImage } from '../shared/user-image';
import {Post} from '@/utils/models';

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
    <div className={containerClasses}>
      {showUser && (
        <div className='absolute -ml-[82px] -mt-xs'>
          <UserImage border={true} url={post?.creator?.avatarUrl}></UserImage>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
