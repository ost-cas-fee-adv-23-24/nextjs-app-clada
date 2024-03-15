import { Settings } from '@/components/modal/settings';
import { auth } from '../api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Settings></Settings>
    </div>
  );
}
