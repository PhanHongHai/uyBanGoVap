const mongoose=require('mongoose');
var comment=new mongoose.Schema({
    content:'String',
    userName:'String',
    email:'String',
    time:'String',
    idBV:{type:"ObjectId",ref:'News'}
},{collection:'Comment'});
module.exports=mongoose.model('Comment',comment);