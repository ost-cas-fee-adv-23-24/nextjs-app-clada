import {
  GetUserById,
  // GetUserFollowees,
  // GetUserFollowers,
  GetUsers,
} from '../api/actions/user.actions';
import { auth } from '../api/auth/[...nextauth]/auth';

export default async function Page() {
  const session = await auth();
  const users = await GetUsers();

  const singleUser = await GetUserById(users.data[0].id as string);
  // const usersFollowers = await GetUserFollowers({
  //   id: users.data[0].id as string,
  // });
  // const usersFollowees = await GetUserFollowees({
  //   id: users.data[0].id as string,
  // });

  return (
    <div>
      <div>
        <h2 className='mb-font-h2'>Get Users</h2>
        <div>{JSON.stringify(users)}</div>
      </div>
      <div>
        <h2 className='mb-font-h2'>Get User</h2>
        <div>{JSON.stringify(singleUser)}</div>
      </div>
      {/* <div>
        <h2 className='mb-font-h2'>Get User's Followers</h2>
        <div>{JSON.stringify(usersFollowers)}</div>
      </div>
      <div>
        <h2 className='mb-font-h2'>Get User's Followees</h2>
        <div>{JSON.stringify(usersFollowees)}</div>
      </div> */}
    </div>
  );
}
