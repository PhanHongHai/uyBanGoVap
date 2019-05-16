const methodCateType = require('../Model/LoaiDanhMuc/Method');
const methodAccount = require('../Model/Account/Method');

module.exports = {
    loadCateType: async (req, res) => {
        if (req.isAuthenticated()) {
            let listType = await methodCateType.getListCateType;
            res.render('/admin/CategoryType', { title: 'QL Loại Danh Mục', acc: req.user, list: listType });
        }
        else {
            res.redirect('/login');
        }

    },
    
    
}