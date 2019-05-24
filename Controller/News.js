const method = require('../Model/TinTuc/Method');
const model=require('../Model/TinTuc/News');
const modelCate=require('../Model/DanhMuc/Category');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}

module.exports={
    loadPage: async (req,res) => {
        if (req.isAuthenticated()) {
            link=bread(req);
            listCate=await modelCate.find({});
            listNews=await model.find({});
            res.render('admin', { title: 'QL Bài viết', link: link, user: req.user, list: listNews ,cate:listCate,path:'TinTuc',count:req.session.count });
        }
        else
            res.redirect('/logIn');
    },
    addNews: (req,res) => {
        method.addNews(req.body);
    },
    updateNews: (req,res) => {
        model.findOneAndUpdate({_id:req.params.idNew},req.body,(err) => {
            if(err)
                res.status(500).json({mess:'fail'});
            else
                res.status(200).json({mess:'success'});
        })
    },
    deleteNews: (req,res) => {
        model.findOneAndRemove({_id:req.params.idNew},(err) => {
            if(err)
                res.status(500).json({mess:'fail'});
            else
                res.status(200).json({mess:'success'});
        })
    }
}