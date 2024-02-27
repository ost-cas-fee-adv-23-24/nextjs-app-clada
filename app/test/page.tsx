import { GetUsers } from "../api/actions/user.actions";
import { auth } from "../api/auth/[...nextauth]/auth";

export default async function Page() {
    const session = await auth();
    const users = await GetUsers()
  
    return (
        <div>{JSON.stringify(users)}</div>
    );
  }