const mongoose=require('mongoose');
var feedBack =new mongoose.Schema({
    name:'String',
    email:'String',
    address:'String',
    phone:'Number',
    title:'String',
    content:'String'
},{collection:'FeedBack'});
module.exports=mongoose.model('FeedBack',feedBack);