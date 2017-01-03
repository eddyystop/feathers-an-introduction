# Real-time

In Feathers, real-time means that services automatically send
created, updated, patched and removed events when
a create, update, patch or remove service method is complete.
Clients can listen for these events and then react accordingly.

![Feathers Realtime](/img/real-time-events-flow.jpg)

The client in a chat room app, for example,
could automatically receive all messages posted by any of the participants,
and then display them.
This is **much** simpler than the traditional design pattern
which requires long-polling of the server.

As another example, the client could maintain a local copy of
part of a database table.
It can keep it up to date by listening to events for that table.

> **Real-time.** Real-time events are sent only to Feathers websocket clients.
They are not sent to Feathers REST ot HTTP REST clients.
These would have implement a traditional long-polling design.
**Conclusion:** Use Feathers websocket clients.

Let's create an event listener for the [Feathers Websocket Client](./socket-client.md)
we already have.

## Working example

| Server source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/c/1.js

| Listener HTML code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/listener.html

| Listener source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/listener-app.js

| Client HTML code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/socketio.html

| Client source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/feathers-app.js

| Start the server: `node ./examples/step/01/c/1`

| Start the listener by pointing a browser tab at `//localhost:3030/listener.html`

| Start the source of changes by pointing a browser tab at: `//localhost:3030/socketio.html`

## Implementing a listener

Implementing a listener is straight forward.

```javascript
const users = app.service('/users');

users.on('created', user => console.log('created', user));
users.on('removed', user => console.log('removed', user));

console.log('Listening for user events.');
```

## Filtering

Our listener's console displays:

```text
Listening for user events.
created
{email: "jane.doe@gmail.com", password: "11111", role: "admin", _id: "qyRMR6abq8RHV29R"}
created
{email: "john.doe@gmail.com", password: "22222", role: "user", _id: "XI6e3bZcoupb6Hyr"}
created
{email: "judy.doe@gmail.com", password: "33333", role: "user", _id: "qeYSi2KrkwIUMoaE"}
created
{email: "jack.doe@gmail.com", password: "44444", role: "user", _id: "BmMwIbBciRGsWv2h"}
removed
{email: "jack.doe@gmail.com", password: "44444", role: "user", _id: "BmMwIbBciRGsWv2h"}
```

You usually wouldn't want to send passwords to clients.

In many cases you probably want to be able to send certain events to certain clients,
say maybe only ones that are authenticated.

You can control what data is sent to which clients with
[event filters](https://docs.feathersjs.com/real-time/filtering.html).

![Feathers Realtime](/img/event-filter-diagram.jpg)

For example, we could send `users` events only to authenticated users
and remove `password` from the payload with:
```javascript
users.filter((data, connection) => {
  delete data.password;
  return connection.user ? data : false;
});
```
