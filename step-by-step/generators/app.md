# Generating an app

Let's generate a new project.

## Working example

| Server source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/03/b/

| Client HTML code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/03/b/public/socketio.html

| Client source code: https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/03/b/public/feathers-app.js

| Start the server: `node ./examples/03/b/src`

| Point the browser at: `//localhost:3030/socketio.html`

## Creating an app

The [app generator](https://docs.feathersjs.com/getting-started/scaffolding.html#generate-the-app)
wrote most of `examples/03/b/` using

```text
feathers-an-introduction$ mkdir ./examples/03/b
feathers-an-introduction$ cd ./examples/03/b
b$ feathers generate

Project name: Feathers-guide-03-b
Description: (enter)
What type of API are you making: REST & Realtime via Socket.io
CORS configuration: Disabled
What database do you primarily want to use?: NeDB
What authentication providers would you like to support?: local
Do you want to update this generator?: No

b$ rm -rf node_modules
```

After generating the code, the generator ran `npm install` in order to load the app's dependencies.
We remove those dependencies as they already installed at the root of `feathers-an-introduction`.

## App structure

The app organization is

- **config/** The configuration files.
`production.json` values override `default.json` ones when in production mode,
i.e. when you run `NODE_ENV=production node ./example/03/b/src`.

- **data/** Where the NeDB tables reside.

- **public/** The contents have been copied from our previous examples.

- **src/** The server.
    
    - **hooks/** Your custom hooks which are general enough to used with multiple services.
    
    - **middleware/** Standard Express middleware is set up for your convenience.
    
    - **services/** Contains the services.
    `services/index.js` runs through the services, configuring them.
    
        - **authentication/** The local authentication service.
        
        - **user/** The user service. It was added because its a dependency of local authentication.
        
            - **user/index.js** Configures the service.
            It includes `paginate: { default: 5, max: 25 }` which is something we have not seem before.
            It means the find method may never return more than 25 items at a time,
            and that by default it will return 5 items.
        
            - **hooks/** The hooks for the service. Called by `user/index.js`.
            
    - **app.js** Configures Feathers.
    
    - **index.js** Starts the HTTP server.
 
- **test/** Test folder with some simple tests.

## Authentication

The frontend code includes
```javascript
app.authenticate({
  type: 'local',
  'email': 'jane.doe@gmail.com',
  'password': '11111'
})
  .then(() => console.log('\nAuthenticated successfully.\n '))
  .catch(err => console.error('\nError authenticating:', err));
```

This attempts to authenticate the user.

> ** Promise Refresher.** Should an error occur during execution of a Promise
or its `then` chain, the next `.catch(err => ...)` is executed.

## The app

The app is very similar to [Writing a Feathers websocket Client](../basic-feathers/socket-client.md)
and you should have little trouble understanding the generated code.

## The results

The results are similar to
[Writing a Feathers websocket Client](../basic-feathers/socket-client.md).
The result for find is different because the user service was configured with pagination.

```text
created Jane Doe item
 Object {email: "jane.doe@gmail.com", role: "admin", _id: "UmH30nDOBjnn7QBB"}
created John Doe item
 Object {email: "john.doe@gmail.com", role: "user", _id: "edz7y7QF6ipR00z7"}
created Judy Doe item
 Object {email: "judy.doe@gmail.com", role: "user", _id: "QGqa4DxOtOFT4XPY"}
created Jack Doe item
 Object {email: "jack.doe@gmail.com", role: "user", _id: "HTel2m2xgDvHOFc7"}

Authenticated successfully.
 
deleted Jack Doe item
 Object {email: "jack.doe@gmail.com", role: "user", _id: "HTel2m2xgDvHOFc7"}
find all items
 Object {total: 3, limit: 5, skip: 0, data: Array[3]}
   data: Array[3]
     0: Object
       _id: "QGqa4DxOtOFT4XPY"
       email: "judy.doe@gmail.com"
       role: "user"
     1: Object
       _id: "UmH30nDOBjnn7QBB"
       email: "jane.doe@gmail.com"
       role: "admin"
     2: Object
       _id: "edz7y7QF6ipR00z7"
       email: "john.doe@gmail.com"
       role: "user"
     length: 3
   limit: 5
   skip: 0
   total: 3
```
