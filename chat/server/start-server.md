# Starting the server

The server needs authentication, which automatically creates `users`, and `messages`.
Let's handle the user avatar also.

## Working example

| Source code: [chat/server/start](https://github.com/eddyystop/feathers-an-introduction/tree/master/examples/chat/server/start)

| Run it: `node ./examples/chat/server/start/src`

## Basic scaffolding

We generated the app with:
```text
mkdir examples/chat/server/start
cd examples/chat/server/start
start$ feathers generate
```
![generate chat app](./assets/generate-chat.jpg)

This generated the
[authentication](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/chat/server/start/src/services/authentication/index.js)
and
[users](https://github.com/eddyystop/feathers-an-introduction/tree/master/examples/chat/server/start/src/services/user)
services.
We then generated the
[messages](https://github.com/eddyystop/feathers-an-introduction/tree/master/examples/chat/server/start/src/services/message)
service with:

![generate message service](./assets/generate-service-message.jpg)

We continued by generating a hook for handling the
[user avatar](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/chat/server/start/src/services/user/hooks/gravatar.js)
with:
![generate gravatar hook](./assets/generate-hook-gravatar.jpg)

## Clearing the database

Let's add code to
[chat/server/start/src/app.js](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/chat/server/start/src/app.js)
clear the database each time this basic server is run.
This'll help prevent confusion should the server be started multiple times.

```javascript
// examples/chat/server/start/src/app.js
app.service('/users').remove(null)
  .then(() => console.log('users table cleared.'))
  .catch(err => console.log('ERROR clearing users table:', err));

app.service('/messages').remove(null)
  .then(() => console.log('messages table cleared.'))
  .catch(err => console.log('ERROR clearing messages table:', err));
```

- `service.remove(null)` deletes all of that service's items.

> **Remove.** You have to be careful not to accidentally pass `null`.
One way to protect yourself is by using a before hook that throws on `null`.

## Running the server

Start the server with `node ./examples/chat/server/start/src` and you will see:
```text
Feathers application started on localhost:3030
users table cleared.
messages table cleared.
```

Let's exercise the server with HTTP REST using these
[curl](http://www.slashroot.in/curl-command-tutorial-linux-example-usage)
commands:
[import](../../examples/chat/server/start/curl-requests.sh)

Run them on another terminal with `./examples/chat/server/start/curl-requests.sh`
and the following is displayed:

```text
feathers-an-introduction$ ./examples/chat/server/start/curl-requests.sh
POST user john@gmail.com
{"email":"john@gmail.com","avatar":"https://s.gravatar.com/avatar/1f9d9a9efc2f523b2f09629444632b5c?s=60","_id":"WZl8x0bsbP5JW1Po"}
POST message Hello.
{"text":"Hello.","_id":"ObRdBmk5joooylTx"}
POST message Hello again!
{"text":"Hello again!","_id":"KZ2Kjp9nnGMta8zP"}
POST message Anyone there?
{"text":"Anyone there?","_id":"tcjSjPZQx8JoUCrz"}
```

The password is not displayed due to the users' after remove hook

## Is anything wrong, unclear, missing?
[Leave a comment.](https://github.com/eddyystop/feathers-an-introduction/issues/new?title=Comment:Chat-Server-Start-server&body=Comment:Chat-Server-Start-server)
