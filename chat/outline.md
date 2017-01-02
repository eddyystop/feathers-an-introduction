- a
    - feathers generate
        - Project name: guide-chat-server
        - Project name guide-chat-server
        - Description 
        - What type of API are you making? (Press <space> to select)REST, Realtime via Socket.io
        - CORS configuration Enabled for all domains
        - What database do you primarily want to use? NeDB
        - What authentication providers would you like to support? (Press <space> to select)local
        - Do you want to update this generator? No
        - rm -rf node_modules
    - feathers generate service
        - What do you want to call your service? message
        - What type of service do you need? database
        - For which database? NeDB
        - Does your service require users to be authenticated? **No**
    - feathers generate hook
        - What do you want to call your hook? gravatar
        - What type of hook do you need? before hook
        - What service is this hook for? **user**
        - What method is this hook for? create
        - paste gravatar code
    - server
        feathers-an-introduction$ node ./examples/chat/server/a/src
        Feathers application started on localhost:3030
        users table cleared.
        messages table cleared.
    - curl
        feathers-an-introduction$ ./examples/chat/server/a/curl-requests.sh
        POST user john@gmail.com
        {"email":"john@gmail.com","avatar":"https://s.gravatar.com/avatar/1f9d9a9efc2f523b2f09629444632b5c?s=60","_id":"WZl8x0bsbP5JW1Po"}
        POST message Hello.
        {"text":"Hello.","_id":"ObRdBmk5joooylTx"}
        POST message Hello again!
        {"text":"Hello again!","_id":"KZ2Kjp9nnGMta8zP"}
        POST message Anyone there?
        {"text":"Anyone there?","_id":"tcjSjPZQx8JoUCrz"}
        - password is not displayed due to the users' after remove hook
- b
    - add client
    - run
        - server node ./examples/chat/server/b/src
            - displays
            feathers-an-introduction$ node ./examples/chat/server/b/src
            Feathers application started on localhost:3030
            messages table cleared.
            users table cleared.
        - client http://localhost:3030/socketio.html
            - On Sign Up screen: lee@gmail.com & lee123 & 'Add user'
            - On Sign In screen: lee@gmail.com & lee123 & 'Sign in'
            - On Chat Room screen: Hello! && "Send message"
            - displays
            user created {email: "lee@gmail.com", avatar: "https://s.gravatar.com/avatar/3b51941a9904ce23b87c58372d0c9aa2?s=60", _id: "bEd9fgn06Q4wFYRe"}
            message created {text: "Hello!", _id: "P71CPAehOTc0PVsE"}
- c
    - add authentication to messages.hooks.index
    - feathers generate hook
        - What do you want to call your hook? process
        - What type of hook do you need? before hook
        - What service is this hook for? **message**
        - What method is this hook for? (Press <space> to select)create
        - paste process
    - feathers generate hook
        - What do you want to call your hook? restrict-to-sender
        - What type of hook do you need? before hook
        - What service is this hook for? message
        - What method is this hook for? update, patch, remove
        - paste code
    - run
        - server node ./examples/chat/server/c/src
            - displays
            feathers-an-introduction$ node ./examples/chat/server/c/src
            Feathers application started on localhost:3030
            users table cleared.
        - client http://localhost:3030/socketio.html
            - On Sign Up screen: ying@qq.cn & ying123 & 'Add user'
            - On Sign In screen: ying@qq.cn & ying123 & 'Sign in'
            - On Chat Room screen: 新年快樂 (Happy New Year in Chinese) && "Send message"
            - displays
            user created
            { email: "ying@qq.cn",
              avatar: "https://s.gravatar.com/avatar/db67e5e4176f9c9aaf76e6bd17cf447d?s=60",
              _id: "hQqkIjupqGKEyKO0" }
            message created
            { _id: "Wvm38PB310eykSSB",
              createdAt: 1483306202115
              sentBy: {
                avatar: "https://s.gravatar.com/avatar/db67e5e4176f9c9aaf76e6bd17cf447d?s=60",
                email: "ying@qq.cn"
              },
              text: "新年快樂" }
- d
    - discuss feathers-authentication-management