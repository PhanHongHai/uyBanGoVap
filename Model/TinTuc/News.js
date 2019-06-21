const mongoose=require('mongoose');
var news=new mongoose.Schema({
    title:'String',
    mainContent:'String',
    postTime:'String',
    linkImg:'String',
    linkSEO:'String',
    idCate:{type:'ObjectId',ref:'Category'}
},{collection:'News'});
module.exports =mongoose.model('News',news);