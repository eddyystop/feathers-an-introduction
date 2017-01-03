
const users = app.service('/users');
const messages = app.service('/messages');

messages.on('created', message => console.log('message created', message));
messages.on('removed', message => console.log('message removed', message));

users.on('created', user => console.log('user created', user));
users.on('removed', user => console.log('user removed', user));

console.log('Listening for user and message events.');
