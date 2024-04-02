import PostList from '@/components/post-list/post-list';
import { CreatePost } from '@/components/post/create-post';
import { GetPosts } from './api/actions/post.actions';
import { auth } from './api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();

  const posts = await GetPosts({
    limit: 10,
  });

  return (
    <section>
      <h1 className='text-primary-600 mb-font-h2'>Willkommen bei Mumble!</h1>
      <h2 className='text-base-500 mb-font-h4'>
        Das Vögelchen zwitschert nicht mehr wie bis anhin. Was sagst du uns
        heute dazu?.
      </h2>
      <div className='pt-l'></div>
      {session && <CreatePost />}
      <div className='pt-m'></div>
      {posts && <PostList postsPaginatedResult={posts} />}
    </section>
  );
}
