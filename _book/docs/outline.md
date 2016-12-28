
Break into 10-min read sections, so they can each be published individually on Medium.
This likely means each 2nd level (DB connector, Wrap it in REST, ...) is a section.
Have a repo which contains a working example of each section's code.

'Step by Step Guide To Basic Feathersjs'
'The unbearable lightness of Feathersjs'

- don't worry about
    - How do I use my particular database?
    - How do I organize my app?
    - authentication
    - how do I use it with React, Angular, Vue
    - Promises, you'll learn what you need to know while reading this. (include?)

- What is Feathersjs?

PART 1 - 'Step by Step Introduction To Basic Feathersjs'

- 01) The goal of this introduction

    - Approach
        - A pet peeve of mine are frameworks that make things “seem” easy by generating thousands of lines of code for you and in the process making it almost impossible to implement anything not supported out of the box by their generators.
        - There are generators for Feathers (that are sometimes taken too seriously, probably because of the aforementioned experiences with other frameworks)
        - a complete database backed CRUD REST and websocket API takes only 30 lines of code to write from scratch.
        - So this guide will concentrate on actual code, you understand how Feathers works, so sre comfortable making changes after using the generators
        - Then it'll introduce the generators.
        - This guide walks you through working examples.
          We'll be showing most that code and explaining it in detail.
          
          Code samples alone can result in ambiguities and unanswered questions.
          Working examples are less prone to that,
          and they allow the reader to explore by modifying the code
- 02) Getting rid of boilerplate. The "ah ha" moment.
    - a) DB connector ("So many DBs, so little time.")
        - 1) example
            - NeDB
            - create & find
        - 2) universal DBs (Might be best to skip this section. Models very customized. Just talk?)
            - mongoDB, etc.
    - b) Wrap it in REST ("I need REST")
        - 1) config REST, use with curl requests
        - 2) ????? show using fetch, axios ?
        - 3) use with feathers-rest THE AH_HA MOMENT
    - c) Sockets from client ("SOCKET to your client")
        - 1) client code doing same DB calls REINFORCE THE AH_HA MOMENT
    - d) Hooks
        - contains business logic
        - 2) hooks, validateSchema, with conditional decisions
        - 3) softDelete
        - we'll see more hooks as we continue
- 03) Getting rid of all boilerplate
    - How do I organize my app?
        - That's easy. Look at how the generators organize things.
        - And with what we've gone over, you'll understand the code produced.
    - b) generator
        - generate a project with `yo feathers generate`
            - Project name: Feathers-guide-03-a
            - Description: (enter)
            - What type of API are you making: REST & Realtime via Socket.io
            - CORS configuration: Disabled
            - What database do you primarily want to use?: NeDB
            - What authentication providers would you like to support?: local
            - Do you want to update this generator?: No
            - Writes code and runs `npm install`
            - Delete node_modules/ as the dependencies are already at the root of the repo
        - some code added, commented some out
        - You know enough now to understand the generated code
        - Explain local authentication
            - server side
            - client side
    - c) more generators
        - feathers generate service
        - feathers generate middleware
        - feathers generate hook
    - d) another generator example
        - Copy examples/03/a to examples/03/d
        - add a service with `feathers generate service` (there is no yo in front this time)
            - What do you want to call your service?: teams
            - What type of service do you need?: database
            - For which datbase? NeDB
            - Does your service require users to be authenticated? Y (enter)
            - Delete node_modules/ as the dependencies are already at the root of the repo
        - some code added, commented some out
        - Database is loaded in server
        - populate & serialize hooks. can populate to any depth.
- 04) Is Feathers production ready?
        - How Feathers came to be and why we built it https://blog.feathersjs.com/why-we-built-the-best-web-framework-you-ve-probably-never-heard-of-until-now-176afc5c6aac#.ttpidtwym
        - Is it production ready? https://www.quora.com/Is-FeathersJS-production-ready
- 05) You now ready to build a more complicated app
        - Read :Building Your First Feathers App" https://docs.feathersjs.com/getting-started/readme.html
        - Then read Feathers Patterns
- 06) Appendix
    - What is this?
            - .configure(), this = app
            - hook => {}, this = service

PART 2 - Feathers Patterns

- See, I'm doing this thing
    - When a service call just isn't enough
    - Adapter for Redux
    - Adapter for Angular2 (?)
    - Adapter for Vue2 (?) 
        - ? https://github.com/t2t2/vue-syncers-feathers
        - https://feathersjs.slack.com/messages/help/files/F3HMXTN72/
- Let's get awesome
    - client input ("The client is mostly right")
        - $client
        - clients telling servers how to populate and serialize
- There's more to life than tables
    - custom services
    - first example see (1) below
        - example swagger service
        - just look at feathers-authentication-management routing
        - info for a dashboard
    - proxy services
        - example
- I said client, not frontend
    - convert proxy example so proxy server starts a feathers-client to another server
        - define services at the frontend,
        - write hooks for them,
        - make them communicate with backend services if needed.
- Did I say server? I meant frontend
    - hooks on clients
    - custom services on client
    - caching on client
    - local copy of part of DB (?)
- Let's get serious
    - authentication
        - multiple examples of authentications
    - permissions
        - examples
    - local authentication
        - feathers-authentication-management
- maybe deployment




(1) custom service example #1
app.use('/todos', {
  get(id) {
    return Promise.resolve({
      id,
      description: `You have to do ${id}!`
    });
  }
});


Notes:
- feathers-hooks-common needs fix in iffElse
- Need ValidateSchema package. Remove stubs from sample code.