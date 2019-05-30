const mongoose=require('mongoose');
var AdPro=new mongoose.Schema({
    titleAP:'String',
    linkFile:'String',
    sequence:'String',
    method:'String',
    profile:'String',
    resolutionTime:'String',
    object:'String',
    result:'String',
    fees:'String',
    nameForm:'String',
    request:'String',
    legalBasis:'String',
    idField:{type:"ObjectId",ref:'Field'},
    idCQ:{type:"ObjectId",ref:'AgencyIssued'}
},{collection:'AdministrativeProcedures'});
module.exports=mongoose.model('AdministrativeProcedures',AdPro);