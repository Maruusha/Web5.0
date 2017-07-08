const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars')
const questionRouter = require('./modules/question/question.js');

let app = express();
let hbs = exhbs.create({});

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req,res) =>{
  try {
    questionsList = JSON.parse(fs.readFileSync('question.json', 'utf-8'));
  } catch (exception) {
    console.log(exception);
    questionsList = [];
  }
  console.log(questionsList[1]);
  let random_id = Math.floor(Math.random() * questionsList.length );
  let result = questionsList[random_id].content;

  res.render('home', {
    id :  random_id,
    content : result
  });
})
//question/:id
app.use('/question', questionRouter);

// app.get('/ask', (req, res) =>{
//     res.render('ask');
// })

app.listen(3000, () =>{
  console.log('Server is running at localhost:3000');
})
