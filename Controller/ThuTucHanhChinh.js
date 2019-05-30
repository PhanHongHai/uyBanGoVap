const model = require('../Model/ThuTucHanhChinh/ThuTucHC');
const method = require('../Model/ThuTucHanhChinh/Method');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    loadThuTuc: async (req, res) => {
        if (req.isAuthenticated()) {

            // let list=await model.find().sort({_id:-1});
            await model.aggregate(
                [
                    {
                        $lookup: {
                            from: 'Field',
                            localField: 'idField',
                            foreignField: '_id',
                            as: 'field'
                        }
                    },
                    {
                        $lookup: {
                            from: 'AgencyIssued',
                            localField: 'idCQ',
                            foreignField: '_id',
                            as: 'cq'
                        }
                    }
                ], (err, list) => {
                    console.log(list);
                    if (err) {
                        res.render('admin', { title: 'QL Danh Mục', link: link, user: req.user, list: listCate, listType: listType, path: 'Category', count: req.session.count, mess: req.session.mess });
                        throw err;
                    }
                    else {
                        res.render('admin', { title: 'QL Danh Mục', link: link, user: req.user, list: list, listType: listType, path: 'Category', count: req.session.count, mess: req.session.mess });
                    }
                })
        }
        else
            res.redirect('/logIn');
    },
    addThuTuc: (req, res) => {

    },
    updateThuTuc: (req, res) => {

    },
    deleteThuTuc: (req, res) => {

    }
}