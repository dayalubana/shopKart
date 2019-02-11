var express=require('express');
var mongodb=require('mongodb')
var path=require('path')
var hbs=require('hbs');
var bodyParser=require('body-parser')
var session=require('express-session')
var app=express();
var port=process.env.PORT||1313;
var route=require("./routes/app.js");
var book=require("./routes/books.js");
var manage=require("./routes/manage.js");
var cart=require("./routes/cart.js");

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','hbs')


app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
  secret:'secret',
    saveUninitialized:true,
  resave:true
}))

app.use('/',route);
app.use('/books',book);
app.use('/manage',manage);
app.use('/cart',cart);


app.listen(port)
