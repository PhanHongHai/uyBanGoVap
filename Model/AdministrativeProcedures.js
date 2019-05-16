const mongoose=require('mongoose');
var AdPro=new mongoose.Schema({
    titleAP:'String',
    linkFile:'String',
    sequence:'String',
    method:'String',
    profile:'String',
    resolutionTime:'Date',
    object:'String',
    result:'String',
    fees:'String',
    nameForm:'String',
    request:'String',
    legalBasis:'String'
},{collection:'AdministrativeProcedures'});
module.exports=mongoose.model('AdministrativeProcedures',AdPro);