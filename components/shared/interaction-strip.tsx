export const InteractionStrip = ({ post }: { post: TPost }) => {
  return (
    <div className='mt-s flex'>
      <div className='text-primary-500'>replies: {post.replies}</div>
      <div className='ml-xl text-secondary-500'>likes: {post.likes}</div>
      <div className='ml-xl text-base-500'>Copy Link</div>
    </div>
  );
};
