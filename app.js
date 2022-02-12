
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var hbs = require('express-handlebars')
var indexRouter = require('./controllers/index');



const api = require('./rutas')


var app = express();
app.engine('.handlebars', hbs.engine({
  defaultLayout: 'default'
}))

app.set('view engine', '.handlebars')

const mongoose = require('mongoose')

const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://sct:JDB4wilF1GjBFVTS@webintegrationcluster.idown.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await mongoose.connect(uri);
 console.log('Connection succesfull');
}
 finally {
  await client.close();
}
}
run().catch(console.dir);


app.set('views', path.join(__dirname, 'views'));

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);




//app.use('/users', api);
app.use('/api', api)
app.get('/login', (req, res)=>{
  res.render('login')
})

app.get('/products', (req, res)=>{
  res.render('products')
})

app.post('/login', (req, res)=>{
  res.render('login')
})




app.use(express.static('public'));




const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
