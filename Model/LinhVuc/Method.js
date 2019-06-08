const modelLV = require('./Field');


module.exports = {
    addLV: async (data) => {
        let value = await modelLV.find(data);
        if (value.length == 0) {
            let field = new modelLV(data);
            field.save(err => {
                if (err) return false;
                return true;
            });
        }
        else
            return false;
    },
    updateLV:async (id, data) => {
        let value =await modelLV.find(data);
        if (value.length == 0) {
            modelLV.findOneAndUpdate({ _id: id }, { $set: data }, (err) => {
                if (err) throw err;
            });
        }
        else
            return false;
    },
    deleteLV: (id) => {
        modelLV.findOneAndRemove({ _id: id }, (err) => {
            if (err) throw err;
        });
    }
}