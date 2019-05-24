const model = require('./AgencyIssued');
module.exports= {
    addAgency: (data) => {
        let ag= new model(data);
        ag.save();
        return 1;
    },
    updateAgency:(data,id) => {
        model.findOneAndUpdate({_id:id},{$set:data},(err) => {
            if(err) throw err;
        })
    },
    deleteAgency:(id) => {
        model.findOneAndRemove({_id:id},(err) => {
            if(err) throw err;
        });
    }
}