const model = require('../Model/Comment/Comment');
const modelNews = require('../Model/TinTuc/News');
const method = require('../Model/Comment/Method');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            let link = bread(req);
            let data = await modelNews.aggregate([
                {
                    $lookup: {
                        from: 'Comment',
                        localField: '_id',
                        foreignField: 'idBV',
                        as: 'comment'
                    }
                },
                {
                    $sort:{"comment":-1}
                }
            ]);
            res.render('admin', {
                title: 'QL Bình Luận Bài Viết',link:link, user: req.user,
                list: data,  path: 'Comment', count: req.session.count,
                mess: req.session.mess
            });
        }
        else
            res.redirect('/logIn');
    }

}