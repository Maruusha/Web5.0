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

  if (req.body.ans == 'YES'){
    questionsList[req.params.id].yes++;
  } else {
    questionsList[req.params.id].no++;
  }
  let result = questionsList[req.params.id];
  res.send(result);
  
  fs.writeFileSync('question.json', JSON.stringify(questionsList));
});


module.exports = router;
