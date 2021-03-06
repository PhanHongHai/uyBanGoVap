const methodCateType = require('../Model/LoaiDanhMuc/Method');
const BreadCrumb = require('../content/breadCrumb');
const modelType = require('../Model/LoaiDanhMuc/CategoryType');
const methodCate = require('../Model/DanhMuc/Method');
const validate = require('validator');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    loadCateType: async (req, res) => {
        let link = bread(req);
        if (req.isAuthenticated()) {
            let listType = await modelType.find({});
            res.render('admin', { title: 'QL Loại Danh Mục', link: link, user: req.user, path: 'CategoryType', list: listType, count: req.session.count, mess: req.session.mess });
        }
        else
            res.redirect('/login');

    },
    addCateType: async (req, res) => {
        let val = await methodCateType.addCateType(req.body.nameType, req.body.link);
        if (val) {
            res.redirect('/admin/tin-tuc/loai-danh-muc');
        }
        else {
            res.status(500).json({ mess: 0 });
        }
    },
    updateCateType: async (req, res) => {
        await methodCateType.updateCateType(req.params.idType, req.body.nameType, req.body.link);
        res.status(200).json({ mess: 'success' });

    },
    deleteCateType: async (req, res) => {
        await methodCate.deleteListCate(req.params.idType);
        await methodCateType.deleteCateType(req.params.idType);
        res.status(200).json({ mess: "success" });
    }

}