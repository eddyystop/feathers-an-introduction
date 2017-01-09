
// Example - Create service on server with NeDB database

const NeDB = require('nedb');
const path = require('path');

const feathers = require('feathers');
const service = require('feathers-nedb');
							      >	const rest = require('feathers-rest');

const app = feathers()
  .configure(services);

const users = app.service('users');
							      >	  .configure(rest())
							      >	  .configure(services)
							      >	  .configure(middleware);

Promise.all([
  users.create({ email: 'jane.doe@gmail.com', password: 'X2y6
  users.create({ email: 'john.doe@gmail.com', password: 'i6He
  users.create({ email: 'judy.doe@gmail.com', password: '7jHw
])
  .then(results => {
    console.log('created Jane Doe item\n', results[0]);
    console.log('created John Doe item\n', results[1]);
    console.log('created Judy Doe item\n', results[2]);
    
    users.find()
      .then(results => console.log('find all items\n', result
  })
  .catch(err => console.log('Error occurred:', err));

function services() {
  this.use('/users', service({ Model: userModel() }));
}

function userModel() {
  return new NeDB({
    filename: path.join('examples', 'step', 'data', 'users.db
    autoload: true
  });
}