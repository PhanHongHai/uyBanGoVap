const mongoose=require('mongoose');
var type = new mongoose.Schema({
    nameType:'String',
    link:'String'
},{collection:'CategoryType'});
module.exports=mongoose.model('CategoryType',type);