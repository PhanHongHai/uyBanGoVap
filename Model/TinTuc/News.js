const mongoose=require('mongoose');
var news=new mongoose.Schema({
    title:'String',
    mainContent:'String',
    postTime:'Date',
    linkImg:'String',
    shortContent:'String',
    idCate:'mongoose.ObjectId'
},{collection:'News'});
module.exports =mongoose.model('News',news);