
app
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

const teams = app.service('/teams');
const users = app.service('/users');

app.authenticate({
  type: 'local',
  'email': 'jane.doe@gmail.com',
  'password': '11111'
})
  .catch(err => console.error('\nError authenticating:', err))
  .then(() => {
    console.log('\nAuthenticated successfully. ');
    
    teams.find({ query: { type: 'dungeon' }})
      .then(results => {
        console.log('\nAll dungeon teams\n', JSON.stringify(results.data, null, 2));
      })
  })
  .then(() => {
    teams.find({ query: { name: 'Lee family' }})
      .then(results => {
        console.log('\nLee family\n', JSON.stringify(results.data, null, 2));
      })
  })
  .catch(err => console.log('\nError occurred:', err));
