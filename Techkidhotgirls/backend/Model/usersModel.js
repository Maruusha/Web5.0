const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  avatar : {
    type : String
  },
  email : {
    type : String,
    validate : {
      validator : (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message : 'Email not valid'
    }
  },
  active : {
    type : Boolean,
    default : true
  }
}, { timestamps : { createdAt: 'created_at' }}, { collection : 'users'});

usersSchema.pre('save', function(next) {
  let user = this;
  console.log('pre save:',user);

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    })
  })
});

const usersModel = mongoose.model('users', usersSchema);

//TO DO
//Tạo 4 hàm cơ bản Create, Read, Update, Delete

//Create : tạo user
const CreateUser = (userInfo, callback) => {
  let newUser = {
    username : userInfo.username,
    password : userInfo.password,
    avatar : userInfo.avatar,
    email : userInfo.email
  }
  usersModel.create(newUser, (err, doc) => {
    if (err) {
      //console.log(err);
      console.log('Err mongo db:',err.message);
      callback(err);
    } else {
      callback(null,doc);
    }
  })
}
//Read : lấy user bằng id
const GetUserById = (id, callback) => {
  return usersModel.findOne({ _id : id}, (err, user) => {
    if (err) {
      callback(err);
    } else {
      let result = {
        username : user.username,
        email : user.email,
        avatar : user.avatar
      }
      callback(null, result);
    }
  })
}
//Update : update user bằng id
const UpdateUserById = (id, newInfo, callback) => {
  usersModel.findOne( {_id : id}, (err,doc) => {
    if (err) {
      console.log(err);
      callback(err.message);
    } else {
      doc.username = newInfo.username;
      doc.password = newInfo.password;
      doc.email = newInfo.email;

      doc.save((err, doc) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, doc);
        }
      });
    }
  })
}
//Delete : delete user bằng id
const DeleteUserById = (id, callback) => {
  usersModel.remove( {_id : id}, (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
}

module.exports = {
  CreateUser,
  GetUserById,
  UpdateUserById,
  DeleteUserById
}
