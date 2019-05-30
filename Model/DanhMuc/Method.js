const modelCate = require('./Category');
const mongoose = require('mongoose');
module.exports = {
    getListCate: () => {
        modelCate.aggregate(
            [
                {
                    $lookup: {
                        from: 'CategoryType',
                        localField: 'typeCate',
                        foreignField: '_id',
                        as: 'type'
                    }
                }
            ], (err, res) => {
                if (err) throw err;
                else
                    return res;
            })
    },
    addCate: async (data) => {
        data.typeCate = await mongoose.Types.ObjectId(data.typeCate);
        cate = new modelCate(data);
        cate.save();
    },
    updateCate: (id, data) => {
        data.typeCate= mongoose.Types.ObjectId(data.typeCate);
        modelCate.findOneAndUpdate({_id:id},{ $set:data }, (err) => {
            if (err) throw err;
            else
                return 1;
        })
    },
    deleteCate: (id) => {
        modelCate.findOneAndRemove({_id:id}, (err) => {
            return err;
        })
    }
}