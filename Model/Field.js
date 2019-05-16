const mongoose = require('mongoose');
var field= new mongoose.Schema({
    nameFiel:'String'
},{collection:'Field'});
module.exports=mongoose.model('Field',field);