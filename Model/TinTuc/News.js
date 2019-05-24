const mongoose=require('mongoose');
var news=new mongoose.Schema({
    title:'String',
    mainContent:'String',
    postTime:'Date',
    linkImg:'String',
    shortContent:'String',
    idCate:{type:'ObjectId',ref:'Category'}
},{collection:'News'});
module.exports =mongoose.model('News',news);