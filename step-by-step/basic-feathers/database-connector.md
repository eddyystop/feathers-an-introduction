# Writing a Database Connector

Our first Feathers example resides on the server only.
We'll see how easy it is to use a database table.

The example adds some user items to a NeDB database table,
reads them back and displays them.

> **Databases.** We're using the NeDB database because it won't distract us
from concentrating on Feathers. NeDB resembles the popular MongoDB database
but requires neither installation nor configuration.

> Feathers supports over 20 different databases.
Everything we mention in this guide is applicable to all of them.

## Working example

| Source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/a/1.js

| Run it: `node ./examples/step/01/a/1`

## Feathers is modular

Feathers embodies the same spirit as the popular HTTP server framework [Express](http://expressjs.com/) .
It is comprised of small modules that are all completely optional,
and the core weighs in at just a few hundred lines of code.
How's that for light weight!
Now you can see where Feathers got its name.

## Implementing a database connector

We `require` Feathers, the NeDB database and its Feathers adapter.

```javascript
const NeDB = require('nedb');
const path = require('path');
const feathers = require('feathers');
const service = require('feathers-nedb');
```

We start an instance of Feathers and define its services.

```javascript`
const app = feathers()
  .configure(services);
```

`users` is the only service we need  and its a database table located at `examples/step/data/users.db`.

```javascript
function services() {
  this.use('/users', service({ Model: userModel() }));
}

function userModel() {
  return new NeDB({
    filename: path.join('examples', 'step', data', 'users.db'),
    autoload: true
  });
}
```

Create 3 users using Promises.

```javascript
Promise.all([
  users.create({ email: 'jane.doe@gmail.com', password: 'X2y6', role: 'admin' }),
  users.create({ email: 'john.doe@gmail.com', password: 'i6He', role: 'user' }),
  users.create({ email: 'judy.doe@gmail.com', password: '7jHw', role: 'user' })
])
```

Each create returns a promise which resolves into the item added into the database.
NeDB will always adds a unique `_id` property to the user item and the returned item will contain it.

> **Callbacks and Promises.**
`users.create({ ... }, {}, (err, data) => { ... })`
would create a user item using a callback signature.
We however will use Promises in this guide because the
Feathers team prioritizes them.

> ** Promise Refresher.** `Promise.all([ ... ]).then(results => { ... });`
Promise.all takes an array whose elements are JavaScript values or Promises.
It resolves each element, i.e. it waits for any async Promise to complete.
The elements are resolved in parallel, not sequentially,
so Promise.all is a great pattern with which to start independent actions.
The `then` portion is called once all elements are resolved.
It receives an array as a parameter.
The n-th element of the array is the resolved value of the n-th element in Promise.all.


The 3 user items are now are in the database, their values are returned in `results`.
We issue a find for the entire table and print the results.
                
```javascript
.then(results => {
  console.log('created Jane Doe item\n', results[0]);
  console.log('created John Doe item\n', results[1]);
  console.log('created Judy Doe item\n', results[2]);
    
  users.find()
    .then(results => console.log('find all items\n', results))
})
```

> ** Promise Refresher.** `user.find().then(results => ...);`
`user.find()` returns a Promise. `.then(results => ...)` waits for the Promise to resolve,
i.e. for the find to finish.
The zero, one or more items found in the table are returned in the `results` param.

## Service methods

Feathers provides the following service methods:
```javascript
find(params)
get(id, params)
create(data, params)
update(id, data, params)
patch(id, data, params)
remove(id, params)
```

`params` may be `{ query: { ... }, ... }` for `find`,
and for `remove` if `id` is `null`.


#### 
## Results

The server console displays:

```text
feathers-an-introduction$ node ./examples/step/01/a/1
created Jane Doe item
 { email: 'jane.doe@gmail.com',
  password: 'X2y6',
  role: 'admin',
  _id: '6Rq7O4RPYEO2TdAn' }
created John Doe item
 { email: 'john.doe@gmail.com',
  password: 'i6He',
  role: 'user',
  _id: 'Q2bnsBRfO1ScqoqY' }
created Judy Doe item
 { email: 'judy.doe@gmail.com',
  password: '7jHw',
  role: 'user',
  _id: 'Tymf6Nailusd5MZD' }
find all items
 [ { email: 'jane.doe@gmail.com',
    password: 'X2y6',
    role: 'admin',
    _id: '6Rq7O4RPYEO2TdAn' },
  { email: 'john.doe@gmail.com',
    password: 'i6He',
    role: 'user',
    _id: 'Q2bnsBRfO1ScqoqY' },
  { email: 'judy.doe@gmail.com',
    password: '7jHw',
    role: 'user',
    _id: 'Tymf6Nailusd5MZD' } ]
```

> **Boilerplate.** Feathers requires little boilerplate.
It took only 15 lines of code to connect to a database.
