const mongoose=require('mongoose');
var comment=new mongoose.Schema({
    content:'String',
    userName:'String',
    email:'String'
},{collection:'Comment'});
module.exports=mongoose.model('Comment',comment);