--- a/1.js	2017-01-01 10:39:28.194841475 -0500
+++ b/1.js	2017-01-01 10:39:28.514064345 -0500
@@ -1,31 +1,22 @@
 
-// Example - Create service on server with NeDB database
+// Example - Create REST API
 
 const NeDB = require('nedb');
 const path = require('path');
 
-const feathers = require('feathers');
 const service = require('feathers-nedb');
+const rest = require('feathers-rest');
 
-const app = feathers()
-  .configure(services);
+const httpServerConfig = require('../common/httpServerConfig');
+const middleware = require('../common/middleware');
 
-const users = app.service('users');
+const app = httpServerConfig()
+  .configure(rest())
+  .configure(services)
+  .configure(middleware);
 
-Promise.all([
-  users.create({ email: 'jane.doe@gmail.com', password: 'X2y6', role: 'admin' }),
-  users.create({ email: 'john.doe@gmail.com', password: 'i6He', role: 'user' }),
-  users.create({ email: 'judy.doe@gmail.com', password: '7jHw', role: 'user' })
-])
-  .then(results => {
-    console.log('created Jane Doe item\n', results[0]);
-    console.log('created John Doe item\n', results[1]);
-    console.log('created Judy Doe item\n', results[2]);
-    
-    users.find()
-      .then(results => console.log('find all items\n', results))
-  })
-  .catch(err => console.log('Error occurred:', err));
+const server = app.listen(3030);
+server.on('listening', () => console.log(`Feathers application started on port 3030`));
 
 function services() {
   this.use('/users', service({ Model: userModel() }));