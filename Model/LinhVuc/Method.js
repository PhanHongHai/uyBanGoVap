const modelLV=require('./Field');


module.exports=  {
    addLV: async (data) => {
        //let value=modelLV.find(data);
       // console.log(value);
       // if(value != null){
           console.log(data);
            let field=new modelLV(data);
            field.save();
       // }
    },
    updateLV: (id,data) => {
        //let value =modelLV.find(data);
        //if(value !=null){
            console.log(data);
            modelLV.findOneAndUpdate({_id:id},{$set:data},(err) => {
                if(err) throw err;
            });
           
       // }
    },
    deleteLV: (id) => {
        modelLV.findOneAndRemove({_id:id},(err) => {
            if(err) throw err;
        });
    }
}