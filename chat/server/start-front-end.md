# Starting the front-end

We're going to start writing an SPA client in plain JavaScript.
Our goal is to get authentication working
and to rerun the tests of the last section using the client.

## Working example

| Server source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/chat/server/b/src/index.js.js

| Client HTML code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/chat/server/b/public/socketio.html

| Client source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/chat/server/b/public/socketio-app.js

| Start the server: `node ./examples/chat/server/b/src`

| Point the browser at: `//localhost:3030/socketio.html`

## Client HTML

The client HTML is similar to that used in
[Writing a Feathers Websocket Client](../../step-by-step/basic-feathers/socket-client.md).

The page is divided into 3 sections identified by ids `sign-up`, `sign-in` and `chat`.
They contain what you would expect of them.

```HTML
<div id="sign-up">
  <h3>Sign up</h3>
   <input type="text" id="email-signup" placeholder="email: a@a.com" size="15" />
  <input type="text" id="password-signup" placeholder="password: a" size="15" />
  <br />
  <input type="button" id="signup-user" value="Add user" />
  <input type="button" id="to-signin-user" value="Sign in" />
</div>
<div id="sign-in" style="display: none;">
  <h3>Sign in</h3>
  <input type="text" id="email-signin" placeholder="email: a@a.com" size="15" />
  <input type="text" id="password-signin" placeholder="password: a" size="15" />
  <br />
  <input type="button" id="signin-user" value="Sign in" />
  <input type="button" id="to-signup-user" value="Sign up" />
</div>
<div id="chat" style="display: none;">
  <h3>Chat room</h3>
  <input type="text" id="message" placeholder="New message" size="30" />
  <br />
  <input type="button" id="send-message" value="Send message" />
  <input type="button" id="signout-user" value="Sign out" />
</div>
```

The sign-up section is displayed initially.

## Router

```javascript
// DOM
handleClick('signup-user', signUpUser);
handleClick('signin-user', signInUser);
handleClick('signout-user', signOutUser);
handleClick('send-message', sendMessage);
handleClick('to-signin-user', () => router('sign-in'));
handleClick('to-signup-user', () => router('sign-up'));

const els = {};
['sign-up', 'email-signup', 'password-signup', 'sign-in', 'email-signin', 'password-signin', 'chat', 'message']
  .forEach(id => els[id] = document.getElementById(id));

// Routing
const router = (newRoute) => {
  els['sign-up'].style.display = newRoute === 'sign-up' ? 'block' : 'none';
  els['sign-in'].style.display = newRoute === 'sign-in' ? 'block' : 'none';
  els['chat'].style.display = newRoute === 'chat' ? 'block' : 'none';
};
router('sign-up');

function handleClick(id, func) {
  document.getElementById(id).addEventListener('click', func);
}
```

- The client source starts by defining event handlers for all the HTML buttons.

- Our primitive SPA page router `router` displays the proper section for the next route.
So when the button `to-signin-user`, the router is called to display the `sign-in` section.

- The DOM nodes for the section `div` and `input` tags are gathered.

## Feathers events on the client

```javascript
// Feathers
let userList = [];

app
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

const users = app.service('/users');
const messages = app.service('/messages');

users.on('created', () => getUserList());
users.on('updated', () => getUserList());
users.on('patched', () => getUserList());
users.on('removed', () => getUserList());

messages.on('created', message => console.log('message created', message));
messages.on('updated', message => console.log('message updated', message));
messages.on('patched', message => console.log('message patched', message));
messages.on('removed', message => console.log('message removed', message));
```

- `userList` will contain the users, once we ourselves are authenticated.

- The Feathers client configuration is completed,
and the services are defined.

- This section consists mainly of service event handlers.
`userList` is updated on every change in the users table.
Information is logged every time there is a change in the messages table.

## Feathers events on the server

We don't want to send users or messages events to clients
until they have authenticated their users.
So we have to set up event filters on the server.

```javascript
// src/services/user/index.js
// Send user events only to authenticated users. The remove hook already removed the password.
userService.filter((data, connection) => connection.user ? data : false);
````
```javascript
// src/services/message/index.js
// Send message events only to authenticated users.
messageService.filter((data, connection) => connection.user ? data : false);
````

## Helpers for users

```javascript
function signUpUser() {
  const user = { email: els['email-signup'].value.trim(), password: els['password-signup'].value.trim() };
  
  if (!user.email || !user.password) {
    console.log('ERROR: enter name, email and password');
    return;
  }
  
  users.create(user)
    .then(() => router('sign-in'))
    .catch(err => console.log('ERROR creating user:', err));
}

function signInUser() {
  const email = els['email-signin'].value.trim();
  const password = els['password-signin'].value.trim();
  
  if (!email || !password) {
    console.log('ERROR: enter email and password');
    return;
  }
  
  app.authenticate({ type: 'local', email, password })
    .then(() => {
      getUserList();
      router('chat');
    })
    .catch(err => console.error('ERROR authenticating:', err));
}

function signOutUser() {
  app.logout()
    .then(() => router('sign-in'))
    .catch(err => console.log('ERROR logging out:', err));
}

function getUserList() {
  users.find()
    .then(results => {
      userList = results.data;
      console.log('Users in chat\n', results.data.map(user => user.email));
    });
}
```

- `signUpUser` is called when `signup-user` is clicked.
It adds a user item, and then displays the `sign-in` section.

- `signInUser` is called when `signin-user` is clicked.
It authenticates the user and, when successful,
gets the current `userList`.
Finally it displays the `chat` section.

- `signOutUser` is called when `signout-user` is clicked.
It logs the user off and then displays the `sign-in` section.

- `getUserList` reads all the user items.

## Helpers for messages

```javascript`
function sendMessage() {
  const message = { text: els['message'].value.trim() };
  
  if (!message.text) {
    console.log('ERROR: enter message');
    return;
  }
  
  messages.create(message)
    .then(() => els['message'].value = '')
    .catch(err => console.log('ERROR creating message:', err));
}
```

- `sendMessage` add the new message to the messages table.
This will cause that message to be sent to all connected clients
by the messages real-time event.

## Running the client

That's really all we need for the client at this time.

Start the server in one terminal with `node ./examples/chat/server/b/src`.
It will display:
```text
feathers-an-introduction$ node ./examples/chat/server/b/src
Feathers application started on localhost:3030
messages table cleared.
users table cleared.
```

Point the browser at: `//localhost:3030/socketio.html`.

- Sign up page:
    - Enter `ying@qq.cn` for the email.
    - Enter `ying123` for the password.
    - Click `Add user`
- Sign in page:
    - Enter `ying@qq.cn` for the email.
    - Enter `ying123` for the password.
    - Click `Sign in`
- Chat page:
    - Enter `新年快樂` (Happy New Year in Chinese) for the text.
    - Click `Send message`.
    
The console will display
```text
Users in chat
["ying@qq.cn"]
message created
{ _id: "Wvm38PB310eykSSB",
  text: "新年快樂" }
```