const mongoose=require('mongoose');
var acc = new mongoose.Schema({
    username:String,
    password:String,
    role:Number
},{collection:'Account',versionKey:false});
module.exports=mongoose.model('Account',acc);