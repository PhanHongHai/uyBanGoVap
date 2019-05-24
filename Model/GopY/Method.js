const model =require('./FeedBack');
module.exports={
    addGY: async (data) => {
        let gopY=await new model(data);
        await gopY.save((err) => {
            if(err){
                console.log(0);
                return false;
            }
                
            else{
                console.log(1);
                return true;
            }
                
        });
    },
    deleteGY:(id) => {
        model.findOneAndRemove({_id:id},(err) => {
            if(err)
                return false;
            else
                return true;
        })
    }
}