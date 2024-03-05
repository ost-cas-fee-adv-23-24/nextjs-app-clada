// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// users data
const USERS = {
  count: 11,
  data: [
    {
      id: '229387640351294793',
      username: 'christoph@smartive.ch',
      avatarUrl: null,
    },
    { id: '243142103851459040', username: 'cb-auth-demo', avatarUrl: null },
    {
      id: '243752335757595349',
      username: 'petermanser',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/74a47cec-8de0-4675-8b41-d11ef904f0a7',
    },
    { id: '245807822799993686', username: 'patrick', avatarUrl: null },
    {
      id: '245807989095758678',
      username: 'albin',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/9c80cca7-93a7-48a7-81f0-7f77cbd4b707',
    },
    {
      id: '245808067160180753',
      username: 'nico',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/3dd7812f-1161-4ba2-915d-e38ae9a3e251',
    },
    {
      id: '245808142053636950',
      username: 'claudio',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/96249871-b544-48cf-b3ae-bad12deca7fb',
    },
    {
      id: '245808535730944854',
      username: 'ricardo',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/f198d059-6803-4fdc-ae23-fda378872fba',
    },
    { id: '245808936706407254', username: 'malinovic', avatarUrl: null },
    {
      id: '245809311459051537',
      username: 'andre',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/28e17313-a62b-411f-8128-f005b908a853',
    },
    {
      id: '245810520291018769',
      username: 'Bladimir',
      avatarUrl:
        'https://storage.googleapis.com/mumble-api-data/73d867aa-8dda-40bf-8be5-5d36b0685bb2',
    },
  ],
  next: null,
  previous: null,
};

const ALL_USERS = [
  ...USERS,
  {
    id: 3,
    name: 'Tommy',
  },
  {
    id: 4,
    name: 'Timmy',
  },
];

module.exports = [
  {
    id: 'get-users', // route id
    url: '/users', // url in express format
    method: 'GET', // HTTP method
    variants: [
      {
        id: 'success', // variant id
        type: 'json', // variant handler id
        options: {
          status: 200, // status to send
          body: USERS, // body to send
        },
      },
      {
        id: 'all', // variant id
        type: 'json', // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_USERS, // body to send
        },
      },
      {
        id: 'error', // variant id
        type: 'json', // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: 'Error',
          },
        },
      },
    ],
  },
  {
    id: 'get-user', // route id
    url: '/api/users/:id', // url in express format
    method: 'GET', // HTTP method
    variants: [
      {
        id: 'success', // variant id
        type: 'json', // variant handler id
        options: {
          status: 200, // status to send
          body: USERS[0], // body to send
        },
      },
      {
        id: 'id-3', // variant id
        type: 'json', // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_USERS[2], // body to send
        },
      },
      {
        id: 'real', // variant id
        type: 'middleware', // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const userId = req.params.id;
            const user = USERS.find(
              (userData) => userData.id === Number(userId)
            );
            if (user) {
              res.status(200);
              res.send(user);
            } else {
              res.status(404);
              res.send({
                message: 'User not found',
              });
            }
          },
        },
      },
    ],
  },
];
