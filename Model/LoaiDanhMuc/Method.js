const modelCateType = require('./CategoryType');
const mongoose = require('mongoose');
module.exports = {
    getListCateType: () => {
        modelCateType.find({}, (err, data) => {
            console.log(data);
            if (data)
                return data;
            else
                return err;
        });
    },
    checkNameType: async (name) => {
        const data = await modelCateType.find({ nameType: name });
        return data;
    },
    addCateType: async (name,link) => {
        const data = await modelCateType.find({ nameType: name });
        console.log(data);
        if (data.length == 0) {
            let cateType = new modelCateType({ nameType: name,link:link });
            cateType.save();
            return true;
        }
        else
            return false;

    },
    updateCateType: async (id, nameType,link) => {
        await modelCateType.findOneAndUpdate({ _id: id }, { $set: { nameType: nameType,link:link } }, (err) => {
            if (err) {
                return false;
            }
            else {
                return 1;
            }

        })
    },
    deleteCateType: (id) => {
        modelCateType.findOneAndRemove({ _id: id }, (err) => {
            if (err)
                return 0;
            else
                return 1;
        })
    }

}