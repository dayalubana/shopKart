var express=require('express');
var Books=require('../models/books.js');
var app=express();

app.get('/details/:id',(req,res)=>{
  Books.find({_id:req.params.id},(err,book)=>{
    // console.log(book);
    res.render('show',{book:book})
  })


})




module.exports=app;
