
// DOM
const signUpEl = document.getElementById('sign-up');
const emailSignUpEl = document.getElementById('email-signup');
const passwordSignUpEl = document.getElementById('password-signup');
document.getElementById('signup-user').addEventListener('click', addUser);
document.getElementById('to-signin-user').addEventListener('click', () => router('sign-in'));

const signInEl = document.getElementById('sign-in');
const emailSignInEl = document.getElementById('email-signin');
const passwordSignInEl = document.getElementById('password-signin');
document.getElementById('signin-user').addEventListener('click', signIn);
document.getElementById('to-signup-user').addEventListener('click', () => router('sign-up'));

const chatEl = document.getElementById('chat');
const messageEl = document.getElementById('message');
document.getElementById('send-message').addEventListener('click', sendMessage);
document.getElementById('sign-out').addEventListener('click', signOut);

// Routing
const router = (newRoute) => {
  signUpEl.style.display = newRoute === 'sign-up' ? 'block' : 'none';
  signInEl.style.display = newRoute === 'sign-in' ? 'block' : 'none';
  chatEl.style.display = newRoute === 'chat' ? 'block' : 'none';
};
router('sign-up');

// Feathers
app
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

const users = app.service('/users');
const messages = app.service('/messages');

users.on('created', user => console.log('user created', user));

messages.on('created', message => console.log('message created', message));
messages.on('updated', message => console.log('message updated', message));
messages.on('patched', message => console.log('message patched', message));
messages.on('removed', message => console.log('message removed', message));

// Helpers

function addUser() {
  const user = { email: emailSignUpEl.value.trim(), password: passwordSignUpEl.value.trim() };
  
  if (!user.email || !user.password) {
    console.log('ERROR: enter name, email and password');
    return;
  }
  
  users.create(user)
    .then(() => router('sign-in'))
    .catch(err => console.log('ERROR creating user:', err));
}

function signIn() {
  const email = emailSignInEl.value.trim();
  const password = passwordSignInEl.value.trim();
  
  if (!email || !password) {
    console.log('ERROR: enter email and password');
    return;
  }
  
  app.authenticate({ type: 'local', email, password })
    .then(() => router('chat'))
    .catch(err => console.error('ERROR authenticating:', err));
}

function signOut() {
  app.logout()
    .then(() => router('sign-in'))
    .catch(err => console.log('ERROR logging out:', err));
}

function sendMessage() {
  const message = { text: messageEl.value.trim() };
  
  if (!message.text) {
    console.log('ERROR: enter message');
    return;
  }
  
  messages.create(message)
    .then(() => messageEl.value = '')
    .catch(err => console.log('ERROR creating message:', err));
}