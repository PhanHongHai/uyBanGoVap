const model = require('./AgencyIssued');
const modelTT = require('../ThuTucHanhChinh/ThuTucHC');
module.exports = {
    addAgency: (data) => {
        let ag = new model(data);
        ag.save();
        return 1;
    },
    updateAgency: (data, id) => {
        model.findOneAndUpdate({ _id: id }, { $set: data }, (err) => {
            if (err) throw err;
        })
    },
    deleteAgency: (id) => {
        modelTT.findOneAndRemove({ idCQ: id }, err => {
            model.findOneAndRemove({ _id: id }, (err) => {
                if (err) throw err;
            });
        });

    }
}