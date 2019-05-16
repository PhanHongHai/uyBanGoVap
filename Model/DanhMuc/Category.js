const mongoose= require('mongoose');
var cate = new mongoose.Schema({nameCate:'String'},{collection:'Category'});
module.exports=mongoose.model('Category',cate);