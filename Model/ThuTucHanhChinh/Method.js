const model=require('./ThuTucHC');
module.exports={
    addThuTuc:(data) => {
        let val = new model(data);
        val.save((err) => {
            if(err){
                throw err;
                return false;
            }
            else
                return true;
        })
    },
    updateThuTuc:(id,data) => {
        model.findByIdAndUpdate({_id:id},{$set:data},(err) => {
            if(err){
                throw err;
                return false;
            }
            else
            return true;
        })
    },
    deleteThuTuc:(id) => {
        model.findByIdAndRemove({_id:id},(err) => {
            if(err){
                throw err;
                return false;
            }
            else
            return true;
        })
    }
}