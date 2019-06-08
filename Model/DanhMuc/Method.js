const modelCate = require('./Category');
const mongoose = require('mongoose');
const methodNews=require('../TinTuc/Method');
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
    deleteCate:async (id) => {
        modelCate.findOneAndRemove({_id:id}, (err) => {
            if(err){ throw err; return false;}
            else{
                const kt=  methodNews.deleteListNews(id);
                if(kt) return true;
            }
        })
    },
    deleteListCate: async id =>{
        const cate = await modelCate.find({typeCate:id});
        cate.map(async (ele) =>{
           await methodNews.deleteListNews(ele.id);
        });
        modelCate.deleteMany({typeCate:id},err =>{
            if(err) {throw err; return false;};
            return true;
        });

    }
}