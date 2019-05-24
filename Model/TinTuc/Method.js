const modelNews=require('./News');
module.exports={
    getListNews: async () => {
        let data= await modelNews.find();
        return data;
    },
    addNews: async (data) => {
        let news= new modelNews(data);
        news.save();

    },
    updateNews: (id,data) => {
        modelNews.findOneAndUpdate({_id:id},data,(err) => {
            return err;
        })
    },
    deleteNews: (id) => {
        modelNews.findOneAndRemove({_id:id});
    }
}