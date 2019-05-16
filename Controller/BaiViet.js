const methodBaiViet=require('../Model/TinTuc/Method');
const BreadCrumb = require('../content/breadCrumb');

let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports={
    loadBaiViet : (req,res) => {
        let link = bread(req);
        if (req.isAuthenticated()) {
            let tk = await acc.find();
            console.log(tk);
            res.render('admin/Account', { title: 'QL Tài Khoản', link: link, user: req.user, acc: tk});
        }
        else
            res.redirect('/login');
        let listNews = methodBaiViet.getListNews;
        res.status(200).render('/admin/BaiViet',{title:'QL Bài Viết',})
    },
    addBaiViet:methodBaiViet.addNews
}