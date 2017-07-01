const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

console.log('App is runing');

let app = express();

app.use(express.static('public'));

app.get('/question', (req, res) => {
  res.sendFile(__dirname + '/public/question.html');
});

app.post('/question', urlencodedParser, (req, res) => {
  rep = {
    question : req.body.ques
  };
  fs.appendFile('allQuestions.txt', rep.question + '\n' );
  res.sendFile(__dirname + "/" + 'allQuestions.txt');
});

app.listen(3000, () => {
  console.log('App is running at localhost:3000');
});
