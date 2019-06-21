const mongoose=require('mongoose');
var acc = new mongoose.Schema({
    username:String,
    password:String,
    role:{type:Number,default:2}
},{collection:'Account',versionKey:false});
module.exports=mongoose.model('Account',acc);