'use client';

import { UserCard } from './user-card';

let users = [
  {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/28e17313-a62b-411f-8128-f005b908a853',
    firstname: 'First',
    lastname: 'Mumblename',
  },
  {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/d116d06e-b254-4aa3-b02b-b759a3f786fe',
    firstname: 'Hansjörg',
    lastname: 'Batman',
  },
  {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/73d867aa-8dda-40bf-8be5-5d36b0685bb2',
    firstname: 'John D.',
    lastname: 'Mumble',
  },
  {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/96249871-b544-48cf-b3ae-bad12deca7fb',
    firstname: 'John D.',
    lastname: 'Mumble',
  },
  {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/19b781c1-08bb-42f7-86e8-915cee9b54b6',
    firstname: 'John D.',
    lastname: 'Mumble',
  },
  {
    id: '179944860378202369',
    username: 'johnmumble',
    avatarUrl:
      'https://storage.googleapis.com/mumble-api-data/3dd7812f-1161-4ba2-915d-e38ae9a3e251',
    firstname: 'Hans',
    lastname: 'Muster',
  },
];

export const RecommendedUsers = () => {
  return (
    <div>
      <div className='mb-font-h3'>Empfohlene User</div>
      <div className='pt-s'></div>
      <div className='mx-auto flex w-full flex-wrap gap-s'>
        {users.map((user) => (
          <UserCard key={user.id} user={user}></UserCard>
        ))}
      </div>
    </div>
  );
};
