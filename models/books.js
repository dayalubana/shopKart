var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ShopingKart')
var db=mongoose.connection;
var bookSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  category:{
    type:String,
    // required:true
  },
  author:{
    type:String,
    required:true
  },
  publisher:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  cover:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model('Books',bookSchema)
