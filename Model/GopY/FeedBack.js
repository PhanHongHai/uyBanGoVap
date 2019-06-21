const mongoose=require('mongoose');
var feedBack =new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    phone:Number,
    title:String,
    content:String,
    ngay:String,
    check:{type:Boolean,default:true},
    file:String
},{collection:'FeedBack'});
module.exports=mongoose.model('FeedBack',feedBack);