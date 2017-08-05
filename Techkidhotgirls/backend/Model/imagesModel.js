const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const numberImagesPerPage = 20;

const imagesSchema = new Schema({
  imageUrl : {
    type : String,
    require : true
  },
  posterId : {
    type : ObjectId,
    ref : 'users'
  },
  view : {
    type : Number,
    default : 0
  },
  likes : {
    type : [{
      type : ObjectId
    }]
  },
  content : {
    type : String
  },
  title : {
    type : String
  },
  tag : {
    type : [{
      type : String
    }]
  }
}, { timestamps : { createdAt: 'created_at' }}, { collection : 'images'})

const imagesModel = mongoose.model('images', imagesSchema);

const CreateImage = (newImage, callback) => {
  imagesModel.create(newImage, (err,doc)=> {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

const GetImage = (id,callback) => {
  imagesModel.findOne({_id : id}).populate('posterId').exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err.message);
    } else {
      callback(null, doc);
    }
  })
}

const GetAllImagesWithPageId = (pageid, callback) => {
  console.log('get all',pageid);
  let numberImagesSkip = (pageid-1)*numberImagesPerPage;
  imagesModel.find()
             .sort('-createdAt')
             .skip(numberImagesSkip)
             .limit(numberImagesPerPage)
             .exec((err, images) => {
    if (err) {
      callback(err);
    } else {
      callback(null, images);
    }
  });
}

module.exports = {
  CreateImage,
  GetImage,
  GetAllImagesWithPageId
}
