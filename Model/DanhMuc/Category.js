const mongoose= require('mongoose');
var cate = new mongoose.Schema({nameCate:'String',link:'String',typeCate:{type:"ObjectId",ref:'CategoryType'}},{collection:'Category'});
module.exports=mongoose.model('Category',cate);