const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router();


router.get('/:id', (req, res) => {
  console.log(req.params.id);
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }
  console.log(req.query.ans);
  if (req.query.ans == 'YES'){
    questionsList[req.params.id].yes++;
  } else {
    questionsList[req.params.id].no++;
  }
  let result = questionsList[req.params.id];
  res.send(result);

  fs.writeFileSync('question.json', JSON.stringify(questionsList));
});

router.post('/', (req, res) => {
  let questionList;
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }
  console.log(req.body.question);
  question = {
    content : req.body.question,
    yes : 0,
    no : 0
  };

  questionsList.push(question);

  fs.writeFileSync('question.json', JSON.stringify(questionsList));

  res.redirect('/question/'+ (questionsList.length-1) );
});

module.exports = router;
