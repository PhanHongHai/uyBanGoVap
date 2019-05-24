const mongoose=require('mongoose');
var Agency= new mongoose.Schema({nameAg:'String'},{collection:'AgencyIssued'});
module.exports=mongoose.model('AgencyIssued',Agency);