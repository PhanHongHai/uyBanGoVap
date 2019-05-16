const modelNews=require('./News');
module.exports={
    getListNews: async () => {
        let data= await modelNews.find();
        return data;
    },
    addNews: async (title,mainContent,postTime,linkImg,shortContent,idCate) => {
        let data={
            title:title,
            mainContent:mainContent,
            postTime:postTime,
            linkImg:linkImg,
            shortContent:shortContent,
            idCate:idCate
        }
        let news= new modelNews(data);
        if(news.save())
            return 1;
    }
}