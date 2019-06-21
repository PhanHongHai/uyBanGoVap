const method = require('../Model/TinTuc/Method');
const model = require('../Model/TinTuc/News');
const modelCate = require('../Model/DanhMuc/Category');
const BreadCrumb = require('../content/breadCrumb');
const format = require('dateformat');
const mongoose = require('mongoose');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}

module.exports = {
    getList: async (req, res) => {
        let listNews = await model.find({}).sort({ postTime: -1 });
        let count = await model.find({}).count();
        let total = count / 10;
        res.status(200).json({ data: listNews, total: total });
    },
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            link = bread(req);
            listCate = await modelCate.find({});
            model.aggregate(
                [
                    {
                        $lookup: {
                            from: 'Category',
                            localField: 'idCate',
                            foreignField: '_id',
                            as: 'cate'
                        }
                    },
                    {
                        $sort:{postTime:-1}
                    }
                ], (err, list) => {
                    if (err)
                        res.render('admin', { title: 'QL Bài viết', link: link, user: req.user, list: list, cate: listCate, path: 'TinTuc', count: req.session.count, mess: req.session.mess });
                    else {
                        res.render('admin', { title: 'QL Bài viết', link: link, user: req.user, list: list, cate: listCate, path: 'TinTuc', count: req.session.count, mess: req.session.mess });
                    }
                })
        }
        else
            res.redirect('/logIn');
    },
    loadUpdate: async (req, res) => {
        if (req.isAuthenticated()) {
            link = bread(req);
            const listCate = await modelCate.find({});
            let id = mongoose.Types.ObjectId(req.params.idBV);
            const data = await model.aggregate(
                [
                    { $match: { _id: id } },
                    {
                        $lookup: {
                            from: 'Category',
                            localField: 'idCate',
                            foreignField: '_id',
                            as: 'cate'
                        }
                    }
                ]);
            res.render('admin', { title: 'QL Bài viết', link: link, user: req.user, list: data, cate: listCate, path: 'UpdateBV', count: req.session.count, mess: req.session.mess });

        }
    },
    addNews: (req, res) => {
        let date = new Date();
        let postTime = format(date, "d/mm/yyyy, h:MM tt");
        let data = { ...req.body, linkImg: req.file.filename, postTime: postTime };
        method.addNews(data);
        res.redirect('/admin/tin-tuc/bai-viet');
    },
    updateNews: (req, res) => {
        if (req.file) {
            let data = { ...req.body, linkImg: req.file.filename };
            model.findByIdAndUpdate({ _id: req.params.idBV }, { $set: data }, (err) => {
                if (err) {
                    throw err;
                }
                else
                    res.redirect('/admin/tin-tuc/bai-viet');
            });
        }
        else {
            model.findOneAndUpdate({ _id: req.params.idBV }, req.body, (err) => {
                if (err)
                    throw err;
                else
                    res.redirect('/admin/tin-tuc/bai-viet');
            });
        }



    },
    deleteNews: (req, res) => {
        model.findOneAndRemove({ _id: req.params.idBV }, (err) => {
            if (err)
                res.status(500).json({ mess: 'fail' });
            else
                res.status(200).json({ mess: 'success' });
        })
    }
}