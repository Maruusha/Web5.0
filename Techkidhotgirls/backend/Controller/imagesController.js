const express = require('express');
const Router = express.Router();

const imageModel = require('../Model/imagesModel');

Router.post('/', (req, res) => {
  imageModel.CreateImage(req.body, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(doc);
    }
  })
})

Router.get('/getAll', (req, res) => {
  imageModel.GetAllImagesWithPageId(1, (err, images) => {
    if (err) {
      //console.log(err);
      res.send(err);
    } else {
      res.send(images);
    }
  })
})

Router.get('/:id', (req, res) => {
  imageModel.GetImage(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(doc);
    }
  })
})

Router.get('/getAll/:id', (req, res) => {
  imageModel.GetAllImagesWithPageId(req.params.id, (err, images) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(images);
    }
  })
})

module.exports = Router;
