const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars')

let app = express();
let hbs = exhbs.create({});

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req,res) =>{
  res.render('home');
})
//question/:id
app.get('/question/:id', (req, res) => {
  console.log(req.params.id);
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }
  let result = questionsList[req.params.id].content;

  res.render('question', {
    id : req.params.id,
    content : result
  });
})

// router.post('/ask', (req, res) => {
//   //push question
//   let questionList;
//   try {
//     questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
//   } catch (exception) {
//     console.log(exception);
//     questionsList = [];
//   }
//   question = {
//     content : req.body.question
//   };
//   questionsList.push(question);
//   // hình như sai đâu đó trong cái router này
//   res.redirect(`/question/${questionsList.length}`);
// });
//
app.listen(3000, () =>{
  console.log('Server is running at localhost:3000');
})
