const methodCateType = require('../Model/LoaiDanhMuc/Method');


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
    addCateType: async (req,res) => {
        let data={
            typeName:req.nameType
        }
        if(methodCateType.addCateType(data))
            res.render('/admin/CategoryType',{title:'QL Loại Danh Mục',mess});
        else

    }
    
}