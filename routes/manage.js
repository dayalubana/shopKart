var express=require('express')
var Books=require('../models/books.js');
var Categories=require('../models/categories.js');
var app=express();

app.get('/',(req,res)=>{
  res.render('manage')
})
app.get('/books',(req,res)=>{
  Books.find({},(err,books)=>{
    if(err){
      console.log(err);
    }else{
      res.render('books',{books:books})
    }
  })

})
app.get('/categories',(req,res)=>{
  Categories.find({},(err,categories)=>{
    if(err){
      console.log(err);
    }else{
      res.render('categories',{categories:categories})
    }
  })

})
app.get('/books/add',(req,res)=>{
  Categories.find({},(err,categories)=>{
    if(err){
      console.log(err);
    }else{
      res.render('addBook',{categories:categories})
    }
  })
})

app.post('/books/add',(req,res)=>{
  var title=req.body.title.trim();
  var category=req.body.category;
  var author=req.body.author.trim();
  var publisher=req.body.publisher.trim();
  var price=req.body.price.trim();
  var imageUrl=req.body.imageUrl.trim();
  var description=req.body.description.trim();
  if(title!=''&&price!=''&&imageUrl!=''){
    var newBook=new Books({
      title:title,
      category:category,
      author:author,
      publisher:publisher,
      description:description,
      price:price,
      cover:imageUrl
    })

    newBook.save((err)=>{
      if(err){
        console.log("error");
      }
      else{
        console.log("inserted");
      }
    })
    res.location('/manage/books')
    res.redirect('/manage/books')
  }else{
    res.location('/manage/books/add')
    res.redirect('/manage/books/add')
  }

  // console.log(title);
})

app.get('/books/edit/:id',(req,res)=>{
  Books.find({_id:req.params.id},(err,book)=>{
    Categories.find({},(err,categories)=>{
      // console.log(categories);
      res.render('editBook',{book:book,categories:categories})
    })
  })
})
app.post('/books/edit/:id',(req,res)=>{
  var title=req.body.title.trim();
  var category=req.body.category;
  var author=req.body.author.trim();
  var publisher=req.body.publisher.trim();
  var price=req.body.price.trim();
  var imageUrl=req.body.imageUrl.trim();
  var description=req.body.description.trim();
  Books.update({_id:req.params.id},{
    title:title,
    category:category,
    author:author,
    publisher:publisher,
    description:description,
    price:price,
    cover:imageUrl
  },(err)=>{
    if(err){
      console.log(err);
    }
    else{
      res.location('/manage/books')
      res.redirect('/manage/books')
    }
  })
})
app.post('/books/delete/:id',(req,res)=>{
  console.log(req.params.id+"QQQ");
  Books.findByIdAndRemove(req.params.id,(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('deleted');
      res.location('/manage/books')
      res.redirect('/manage/books')
    }

  })
})
app.get('/books/addCategory',(req,res)=>{
  res.render('addCategory')
})
app.post('/books/addCategory',(req,res)=>{
  var name=req.body.name;
  console.log(name)
  var newCategory=new Categories({
    name:name
  })
  newCategory.save((err)=>{
    if(err){
      console.log('category not saved');
    }else{
      console.log('category saved');
      res.location('/manage/categories')
      res.redirect('/manage/categories')
    }
  })
})

app.get('/category/edit/:id',(req,res)=>{
  // Books.find({_id:req.params.id},(err,book)=>{
    Categories.find({_id:req.params.id},(err,categories)=>{
      // console.log(categories);
      res.render('editCategory',{categories:categories})
    })
  // })
})
app.post('/category/edit/:id',(req,res)=>{
  var name=req.body.name.trim();
  Categories.update({_id:req.params.id},{
    name:name
  },(err)=>{
    if(err){
      console.log(err);
    }
    else{
      res.location('/manage/categories')
      res.redirect('/manage/categories')
    }
  })
})
app.post('/category/delete/:id',(req,res)=>{
  // console.log(req.params.id+"QQQ");
  Categories.findByIdAndRemove(req.params.id,(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('deleted');
      res.location('/manage/categories')
      res.redirect('/manage/categories')
    }

  })
})
module.exports=app;
