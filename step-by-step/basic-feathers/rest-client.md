# Writing a Feathers REST Client

We already have a Feathers REST API server from the previous example.
Let's write a Javascript frontend for it.

## Working example

| Server source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/b/2.js

| Client HTML code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/rest.html

| Client source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/feathers-app.js

| Start the server: `node ./examples/step/01/b/2`

| Point the browser at: `//localhost:3030/rest.html`

## Writing a server for Feathers client REST calls

Our frontend will communicate with the current server using its REST API.
**No changes are required!**

## Writing the frontend HTML

We'll soon see most of the frontend doesn't care if we're communicating with the server
using REST or websockets.
To keep things DRY, we are isolating in this HTML the code which is unique to REST.

```HTML
<html>
<head>
  <title>Feathers REST client</title>
  <style>
    body {
      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
      font-weight: 400;
      font-size: 16px;
      color: #333;
    }
  </style>
</head>
<body>
<h1>Feathers guide</h1>
<h2>Example 02.b.2 - Feathers REST client</h2>
<br />
Open console to see results of <strong>feathers-rest</strong> calls.
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/core-js/2.1.4/core.min.js"></script>
<script src="//unpkg.com/feathers-client@^1.8.0/dist/feathers.js"></script>
<script src="/serverUrl.js"></script>
<script>
  const app = feathers()
      .configure(feathers.rest(serverUrl).fetch(fetch))
</script>
<script src="/feathers-app.js"></script>
</body>
</html>
```

- `//cdnjs.cloudflare.com/ajax/libs/core-js/2.1.4/core.min.js`
loads a pollyfill for [fetch](https://davidwalsh.name/fetch) if required.
- `src="//unpkg.com/feathers-client@^1.8.0/dist/feathers.js"` loads the Feathers client code.
- `src="/serverUrl.js"` loads the URL of the server.
The default is `var serverUrl = 'http://localhost:3030';`.
Change the value if you need to.
- `const app = feathers()` instantiates a Feathers client.
- `.configure(feathers.rest(serverUrl).fetch(fetch))` configures the client to use REST
when communicating with the server.
It points to the server,
and passes the `fetch` instruction as the interface for fetching resources.
- `src="/feathers-app.js"` loads the main application.

## Writing the Feathers frontend

Writing the HTML was actually the hard part.
The rest of the application is just a copy of what we used in
[Writing a Database Connector](./database-connector.md)!

```javascript

const users = app.service('/users');

Promise.all([
  users.create({ email: 'jane.doe@gmail.com', password: '11111', role: 'admin' }),
  users.create({ email: 'john.doe@gmail.com', password: '22222', role: 'user' }),
  users.create({ email: 'judy.doe@gmail.com', password: '33333', role: 'user' }),
  users.create({ email: 'jack.doe@gmail.com', password: '44444', role: 'user' }),
])
  .then(results => {
    console.log('created Jane Doe item\n', results[0]);
    console.log('created John Doe item\n', results[1]);
    console.log('created Judy Doe item\n', results[2]);
    console.log('created Jack Doe item\n', results[3]);
  
    const jackId = results[3]._id;
    return users.remove(jackId)
      .then(results => console.log('deleted Jack Doe item\n', results));
  })
  .then(() => {
    return users.find()
      .then(results => {
        console.log('find all items\n', results);
        console.log((results || []).length, 'items returned.');
      })
  })
  .catch(err => console.log(err));
```

> **Feathers "ah-ha" moment.**
We can run **exactly** the same code on the frontend as on the server.
We can code the frontend as if the database was sitting on it.
This makes frontend development significantly simpler.

The results in the console window of the browser are the same as they were
running [Writing a Database Connector](./database-connector.md).

```text`
created Jane Doe item
 Object {email: "jane.doe@gmail.com", password: "11111", role: "admin", _id: "8zQ7mXay3XqiqP35"}
created John Doe item
 Object {email: "john.doe@gmail.com", password: "22222", role: "user", _id: "l9dOTxh0xk1h94gh"}
created Judy Doe item
 Object {email: "judy.doe@gmail.com", password: "33333", role: "user", _id: "3BeFPGkduhM6mlwM"}
created Jack Doe item
 Object {email: "jack.doe@gmail.com", password: "44444", role: "user", _id: "7b0N4w9jmA328yhq"}
deleted Jack Doe item
 Object {email: "jack.doe@gmail.com", password: "44444", role: "user", _id: "7b0N4w9jmA328yhq"}
find all items
 [Object, Object, Object]
   0: Object
     _id: "3BeFPGkduhM6mlwM"
     email: "judy.doe@gmail.com"
     password: "33333"
     role: "user"
   1: Object
     _id: "8zQ7mXay3XqiqP35"
     email: "jane.doe@gmail.com"
     password: "11111"
     role: "admin"
   2: Object
     _id: "l9dOTxh0xk1h94gh"
     email: "john.doe@gmail.com"
     password: "22222"
     role: "user"
  length: 3
3 "items returned."
```
