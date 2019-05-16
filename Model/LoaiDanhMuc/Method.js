const modelCateType=require('./CategoryType');
module.exports={
    getListCateType: async () => {
        let data = await modelCateType.find();
        return data;
    },
    getCateType: async () => {
        
    },
    addCateType: (data) => {
        let cateType= new modelCateType(data);
        if(cateType.save())
            return 1;
        else
            return 0;
    }

}