const config = require('./config.json');
const mongoose = require('mongoose');

console.log('running test');
mongoose.connect(config.ConnectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect db success');
  }
})
const usersModel = require('./Model/usersModel');

userInfo = {
  username : 'long',
  password : '123456',
  avatar : 'http://',
  email : 'long@gmail.com'
}

userId = '597747c0e9a89b10687a13fc'

console.log('Test create user');
usersModel.CreateUser(userInfo);
usersModel.GetUserById(userId).then(doc => {
  console.log('test get user');
  console.log(doc);
});
