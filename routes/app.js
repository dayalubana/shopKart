var express=require('express')
var Books=require('../models/books.js');
var app=express();

app.get('/',(req,res)=>{
  Books.find({},(err,books)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render('index',{books:books})
    }
  })

})

app.get('/about',(req,res)=>{
  res.render('about')
})

module.exports=app;
