var express = require("express");
var app = express();
var API = require('./credentials')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/',(req,res)=>{
})

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1537825',
  key: '7d254d906b0b2c073721',
  secret: '82213524cc5184755a51',
  cluster: 'us2',
  encrypted: true
});

var books = [] ;

app.post('/post',(req,res)=>{
    books.push(req.body.book); 
    pusher.trigger('post', 'add', {
        books : books
      });
      res.json({message : "Book added succesfully"})
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})