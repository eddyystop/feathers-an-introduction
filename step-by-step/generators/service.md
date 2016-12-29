# Adding a service

The user service was added automatically in the previous example because it was needed for
local authentication.

Let's add another service.

## Working example

| Server source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/03/d/

| Client HTML code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/03/d/public/socketio.html

| Client source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/03/d/public/feathers-app.js

| Start the server: `node ./examples/03/d/src`

| Point the browser at: `//localhost:3030/socketio.html`

## Generating a service

We copied `examples/03/b/` to `examples/03/d/`, then

```text
feathers-an-introduction$ cd ./examples/03/d
d$ feathers generate service

What do you want to call your service?: teams
What type of service do you need?: database
For which datbase? NeDB
Does your service require users to be authenticated? Y (enter)
```

Once again we remove the dependencies loaded by the generator
as they are already installed at the root of `feathers-an-introduction`.

## App structure

The teams service has been added to the app at `src/services/teams/`.
Its organized similarly to users.

## Loading the tables

We added function `loadDatabases` to `app.js`. It loads data into the users and teams tables.

The team items contains the `user._id` of the team members.
```javascript
{
  name: 'Doe family',
  type: 'family',
  memberIds: [ userId0, userId1, userId2, userId3 ]
}
````

## Populating items

`teams.hooks/index.js` contains

```javascript
const { populate, serialize } = require('feathers-hooks-common');

const populateSchema = {
  include: [{
    service: 'users',
    nameAs: 'members',
    parentField: 'memberIds',
    childField: '_id'
  }]
};

const serializeSchema = {
  exclude: ['_id', '_include'],
  members: {
    only: ['email', 'role']
  }
};

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
};

exports.after = {
  find: [ populate({ schema: populateSchema }), serialize(serializeSchema) ],
  get: [ populate({ schema: populateSchema }), serialize(serializeSchema) ],
};
```

#### - auth.verifyToken()

Verifies the JWT token that came with the request.
The hook will throw an error message should the token be invalid,
and the error object will be returned to the client automatically.

#### - auth.populateUser()

Add the user item to the information passed to each hook.

#### - auth.restrictToAuthenticated()

Throw if the user is not yet authenticated.

#### - populate({ schema: populateSchema })

Its not uncommon to want to include related information in an item.
In our case we want to join the user items of the members of the team.

The schema passed to the
[populate hook](https://docs.feathersjs.com/v/auk/hooks/common/populate.html#populate)
describes what to join.

```javascript
include: [{
  service: 'users',
  nameAs: 'members',
  parentField: 'memberIds',
  childField: '_id'
}]
```

The `users` service is used to obtain those user items whose `user._id` are included in
`team.memberIds`. The resulting user items are added to the team item as the `members` property.

We might get a result that looks like:
```javascript
{
    name: "Lee family",
    type: "family",
    memberIds: [ "AOSipXQEP5CyhQJd", "srcN0cN4Jsosfbs6", "4vvIA2hZqbYQuqCq" ],
    members: [
      { email: "tim.lee@gmail.com", role: "user, damage", ... },
      { email: "tod.lee@gmail.com", role: "user", ... },
      { email: "sam.lee@gmail.com", role: "user", ... }
    ],
    ...
  }
```

> **Populate.** The populate hook can join multiple services to an item.
Those items may themselves have other items joined to them recursively.

#### - serialize(serializeSchema)

The client often does not need all the information contained in the base items,
nor all in any joined items.
Some information should not be exposed for security reasons.

The schema passed to the
[serialize hook](https://docs.feathersjs.com/v/auk/hooks/common/populate.html#serialize)
describes what information to keep.

```javascript
{ 
  exclude: ['_id', '_include'],
  members: {
    only: ['email', 'role']
  }
}
```

Here we simply drop 2 properties from team items,
and only keep 2 from the newly joined members property.

> **Serialize.** The serialize hook can also compute new properties based on existing ones.

> **Depopulate.** Should you modify your base items and want to `patch` the new values back to the table,
the dePopulate() hook will remove all joined and calculated properties for you.

## The results

The browser console displays the following:

```text
All dungeon teams
 [{
    name: "Fires of Heaven",
    type: "dungeon",
    memberIds: [ "7DA2znpaee8Cb4yP", "88GKWScilz1FzBNA", "AOSipXQEP5CyhQJd" ],
    members: [
      { email: "jane.doe@gmail.com", role: "admin, tank" },
      { email: "john.doe@gmail.com", role: "user, heals" },
      { email: "tim.lee@gmail.com", role: "user, damage" }
    ]
 }]

Lee family
 [{
    name: "Lee family",
    type: "family",
    memberIds: [ "AOSipXQEP5CyhQJd", "srcN0cN4Jsosfbs6", "4vvIA2hZqbYQuqCq" ],
    members: [
      { email: "tim.lee@gmail.com", role: "user, damage" },
      { email: "tod.lee@gmail.com", role: "user" },
      { email: "sam.lee@gmail.com", role: "user" }
    ]
 }]
```

- The user items have onviously been joined to the team items.
- Only the properties selected have been returned.