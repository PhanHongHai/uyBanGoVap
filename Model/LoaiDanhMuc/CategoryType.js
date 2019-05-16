const mongoose=require('mongoose');
var type = new mongoose.Schema({
    nameType:'String',
},{collection:'CategoryType'});
module.exports=mongoose.model('CategoryType',type);