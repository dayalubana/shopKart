var express=require('express')
var Books=require('../models/books.js');
var app=express();
app.get('/',(req,res)=>{
  var cart=req.session.cart;
  var displayCart={items:[],total:0};
  var total=0;

  for(var item in cart){
    displayCart.items.push(cart[item]);
    total+=(cart[item].qty*cart[item].price);
  }
  // console.log(total);
  displayCart.total=total;

  res.render('cart',{cart:displayCart})
})

app.post('/:id',(req,res)=>{
  req.session.cart=req.session.cart||{}
  var  cart=req.session.cart;
  Books.findOne({_id:req.params.id},(err,book)=>{
    if(err){
      console.log(err);
    }
      if(cart[req.params.id]){
        cart[req.params.id].qty++;
        var n=parseInt(cart[req.params.id].price)
        cart[req.params.id].totall=cart[req.params.id].totall+n
      }
      else{
        var q=parseInt(book.price)
        cart[req.params.id]={
          item:book._id,
          title:book.title,
          price:book.price,
          qty:1,
          totall:q
        }
      }
      res.redirect('/cart');
  })

})

module.exports=app;
