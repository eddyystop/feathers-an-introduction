# Writing a Feathers Websocket Client

We already have a Feathers REST frontend.
Its simple to convert that to one using websockets.

> **Websockets.** Feathers can use eight of the most popular websocket libraries.
We will use the popular Socket.io in this guide.


## Working example

- Server code: [ examples/step/01/websocket/1.js](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/websocket/1.js)
- Client code: [common/public/socketio.html](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/socketio.html)
and
[feathers-app.js](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/feathers-app.js)
- Start the server: `node ./examples/step/01/websocket/1`
- Point the browser at: `//localhost:3030/socketio.html`
- Compare with last page's server
[examples/step/01/rest/2.js](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/rest/2.js):
[Unified](http://htmlpreview.github.io/?https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/_diff/01-websocket-1-line.html)
|
[Split](http://htmlpreview.github.io/?https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/_diff/01-websocket-1-side.html)


## Change the server to support clients using either Feathers REST **or** websocket calls

Add 2 lines to the server code so it supports
either REST **or** websocket calls from the Feathers client.

| View complete file [websocket/1.js.](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/websocket/1.js)
View changes from file rest/1.js:
[Unified](http://htmlpreview.github.io/?https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/_diff/01-websocket-1-line.html)
|
[Split](http://htmlpreview.github.io/?https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/_diff/01-websocket-1-side.html)
```javascript
const rest = require('feathers-rest');
const socketio = require('feathers-socketio'); // new

const app = httpServerConfig()
  .configure(rest())
  .configure(socketio()) // new
  .configure(services)
  .configure(middleware);
```

## Changing the HTML for Feathers client websocket calls

| View complete file [common/public/socketio.html.](https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/01/common/public/socketio.html)
View changes from file common/public/rest.html:
[Unified](http://htmlpreview.github.io/?https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/_diff/01-websocket-socketio-line.html)
|
[Split](http://htmlpreview.github.io/?https://github.com/eddyystop/feathers-an-introduction/blob/master/examples/step/_diff/01-websocket-socketio-side.html)
```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/core-js/2.1.4/core.min.js"></script>
<script src="//unpkg.com/feathers-client@^1.8.0/dist/feathers.js"></script>
<script src="/socket.io.min.js"></script>
<script src="/serverUrl.js"></script>
<script>
  const socket = io(serverUrl);
  const app = feathers()
      .configure(feathers.socketio(socket))
</script>
<script src="/feathers-app.js"></script>
```

- `src="/socket.io.min.js"` load the Socket.io client code.
- `const socket = io(serverUrl);` create a websocket.
- `.configure(feathers.socketio(socket))` configure Feathers client to use the websocket.

And that's all there is to it.
The results are identical to that for [Writing a Feathers REST Client](./rest-client.md)
 
## Is anything wrong, unclear, missing?
[Leave a comment.](https://github.com/eddyystop/feathers-an-introduction/issues/new?title=Comment:Step-Basic-Socket-client&body=Comment:Step-Basic-Socket-client)
