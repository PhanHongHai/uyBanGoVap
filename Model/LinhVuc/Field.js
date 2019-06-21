const mongoose = require('mongoose');
var field= new mongoose.Schema({
    nameField:'String'
},{collection:'Field'});
module.exports=mongoose.model('Field',field);