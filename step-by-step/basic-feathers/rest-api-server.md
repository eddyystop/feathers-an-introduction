# Writing a REST API server

Our database connector will function as a full fledged REST API server.
We need only add a HTTP server to it.

>**HTTP servers.** The present Auk version of Feathers is tied into
the popular HTTP server framework [Express](http://expressjs.com/).
Future versions will support multiple frameworks, starting with
[koa](https://github.com/koajs/koa).


## Working example

| Source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/b/1.js

| Run it: `node ./examples/step/01/b/1`

## Implementing a REST API server

This is our previous example with the database method calls removed,
and with an Express server added.

```javascript
const NeDB = require('nedb');
const path = require('path');
const service = require('feathers-nedb');
const rest = require('feathers-rest');
const httpServerConfig = require('../common/httpServerConfig');
const middleware = require('../common/middleware');

const app = httpServerConfig()
  .configure(rest())
  .configure(services)
  .configure(middleware);

const server = app.listen(3030);
server.on('listening', () => console.log(`Feathers application started on port 3030`));

function services() {
  this.use('/users', service({ Model: userModel() }));
}

function userModel() {
  return new NeDB({
    filename: path.join('examples', 'data', 'users.db'),
    autoload: true
  });
}
```

The Express server is configured as follows.

```javascript
// ../common/httpServerConfig
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const path = require('path');
const feathers = require('feathers');

module.exports = () => {
  // do the HTTP server part of the config
  const app = feathers()
    .use(compress())
    .options('*', cors())
    .use(cors())
    .use('/', feathers.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));
  
  return app;
};
```

The Express middleware handles logging, pages not found, and general errors.

```javascript
// ../common/middleware
const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  const app = this;

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
```

> **Boilerplate.** The server configuration and middleware are standard Express.
They have little to do with Feathers other than to feed REST requests to it.

## Running the server

We can now made REST API calls to the server.

In the previous example we created 3 user items and then printed the user file.
We can now do the same thing, but using REST, with the following
[curl](http://www.slashroot.in/curl-command-tutorial-linux-example-usage)
commands:

```text
curl -H "Content-Type: application/json" -X POST -d '{"email":"jane.doe@gmail.com","password":"X2y6","role":"admin"}' http://localhost:3030/users
curl -H "Content-Type: application/json" -X POST -d '{"email":"john.doe@gmail.com","password":"i6He","role":"user"}' http://localhost:3030/users
curl -H "Content-Type: application/json" -X POST -d '{"email":"judy.doe@gmail.com","password":"7jHw","role":"user"}' http://localhost:3030/users
curl -X GET http://localhost:3030/users
```

Run them with `./examples/step/01/b/curl-requests.sh` and the following is displayed:

```text
feathers-an-introduction$ ./examples/step/01/b/curl-requests.sh
POST Jane Doe
{"email":"jane.doe@gmail.com","password":"X2y6","role":"admin","_id":"sbkXV7LVkMhx1NyY"}
POST John Doe
{"email":"john.doe@gmail.com","password":"i6He","role":"user","_id":"uKhqOp4R4hABw9oO"}
POST Judy Doe
{"email":"judy.doe@gmail.com","password":"7jHw","role":"user","_id":"pvcmh9X2i9VZgqWJ"}
GET all users
[
 {"email":"judy.doe@gmail.com","password":"7jHw","role":"user","_id":"pvcmh9X2i9VZgqWJ"},
 {"email"::"jane.doe@gmail.com","password":"X2y6","role":"admin","_id":"sbkXV7LVkMhx1NyY"},
 {"email":"john.doe@gmail.com","password":"i6He","role":"user","_id":"uKhqOp4R4hABw9oO"}
]
```

> **Feathers.** REST API calls are automatically converted into Feathers database method calls
like the `users.create()` and `users.find()` ones we use in the previous example.
How's that for convenience?
