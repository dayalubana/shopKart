var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/ShopingKart')
var db=mongoose.connection;
var categorySchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model('Categories',categorySchema)
