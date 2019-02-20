var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()
var app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db',{useNewUrlParser:true});

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.set('view engine', 'pug')
app.set('views','./views')

app.get('/form', function(req, res){
   res.render('form');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use('/static',express.static('public'))

app.get('/',(req,res)=>{
  res.send("Hello World")
})

app.get('/hello',(req,res)=>{
  res.send('you just called get method at "/hello"!\n')
})

app.post('/hello',(req,res)=>{
  res.send('you just called post method at "/hello"!\n')
})

app.get('/first',(req,res)=>{
  res.render('first_view')
})

app.get('/dynamic',(req,res)=>{
  res.render('dynamic',{name:'kinboy wong',url:'https://kinboy.wang'})
})

app.get('/condition',(req,res)=>{
  res.render('condition',{user:{name:'kinboy wong',age:20}})
})

app.get('/import',(req,res)=>{
  res.render('content')
})

app.get('/static',(req,res)=>{
  res.render('staticfile')
})

app.post('/form', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

app.get('/mongo',(req,res)=>{
  res.render('mongodb')
})

app.post('/mongo', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});


var things = require('./things')
app.use('/things',things)

app.listen(3000)
