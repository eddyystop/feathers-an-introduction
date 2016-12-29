- service adapters
    Redux - feathers-reduxify-services & feathers-reduxify-authentication
    Vue - https://github.com/t2t2/vue-syncers-feathers & https://feathersjs.slack.com/messages/help/files/F3HMXTN72/
    or Beeplin's stuff
    Angular - ?

- client passing info to hooks
    - $client - use populate and serialize
    
- custom services
    - daffl example
    app.use('/todos', {
      get(id) {
        return Promise.resolve({
          id,
          description: `You have to do ${id}!`
        });
      }
    });
    - example swagger service
    - routing
        - just look at feathers-authentication-management routing
    - proxy
    - accumulator
        - dashboard
    - service to create other services
    here is how a service that would allow to create other services could be implemented:
    const stripSlashes = require('feathers-commons').stripSlashes;
    app.use('/__service', {
      create(data) {
        const path = stripSlashes(data.path);
        if(!app.services[path]) {
          app.use(`/${path}`, service(configuration));
        }
        return Promise.resolve(data);
      }
    });
    On the client a new service can then be initialized and then used with:
    app.service('__service').create({ path: '/test' }).then(() => {
      app.service('test').create({ text: `this is a test message` });
    });
        
- RPC
    - use 'create'
    - create a wrapper for the client
        
- the server can start a Feathers client
    - convert proxy example so proxy server starts a feathers-client to another server
        - define services at the frontend,
        - write hooks for them,
        - make them communicate with backend services if needed.
        
- the client can do much of what a server does
    - hooks on clients
    - custom services on client
        - data accumulator
    - caching on client
    - local copy of part of DB (?)
    
- authentication and authorization
    https://github.com/valentinvichnal/feathers-auth-demo
    - authentication
        - multiple examples of authentications
    - permissions
        - examples
    - local authentication
        - feathers-authentication-management
    - create a token
    auth/local is also a service so to log in (create a token) you have to create a new token with that information:
    const { email, password } = req.body;
    const userInfo = { email, password };
    // Get the user service and `create` a new user
    app.service('users').create(userInfo)
    .then(() => app.service('auth/local').create(userInfo))
    .then(authInfo => {
      // do something here with authentication information
    })
    // On errors, just call our error middleware
    .catch(next);

        
- maybe deployment



FAQ
- run middleware after a service call
    See https://docs.feathersjs.com/help/faq.html#how-do-i-access-the-request-object-in-hooks-or-services.
    Basically, you can but we don't recommend it since services shouldn't know about how they are being accessed. Is there a way to figure out based on the data if you want to do a redirect? Then it can be done in a custom Express middleware after the service:
    app.use('/myservice', service(), function(req, res, next) {
      // res.data is the service call result
      const redirectUrl = getRedirectUrl(res.data);
      if(redirectUrl) {
        res.redirect(redirectUrl);
      } else {
        next();
      }
    });

AUTHENTICATION
- lots of working examples
