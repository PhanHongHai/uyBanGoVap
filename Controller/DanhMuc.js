const BreadCrumb = require('../content/breadCrumb');
const modelCate = require('../Model/DanhMuc/Category');
const methodCate = require('../Model/DanhMuc/Method');
const modelType=require('../Model/LoaiDanhMuc/CategoryType');
const cateCtrl=require('../Model/DanhMuc/Method');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}

module.exports={
    loadCategory: async (req,res) => {
        if (req.isAuthenticated()) {
            let link = bread(req);
            let listType = await modelType.find();
            let listCate = await modelCate.find();
            await modelCate.aggregate(
                [
                    {
                        $lookup:{
                            from:'CategoryType',
                            localField:'typeCate',
                            foreignField:'_id',
                            as:'type'
                        }
                    }
               ],(err,list) => {
                   if(err)
                   res.render('admin', { title: 'QL Danh Mục', link: link, user: req.user, list: listCate ,listType:listType,path:'Category',count:req.session.count,mess:req.session.mess });
                   else{
                       console.log(list);
                       res.render('admin', { title: 'QL Danh Mục', link: link, user: req.user, list: list ,listType:listType,path:'Category',count:req.session.count,mess:req.session.mess  });
                   }
               })
        }
        else {
            res.redirect('/login');
        }
    },
    addCategory: async (req,res) => {
        console.log(req.body);
        await methodCate.addCate(req.body);
        res.redirect('/admin/tin-tuc/danh-muc');
    },
    updateCategory: (req,res) => {
        console.log(req.body);
        methodCate.updateCate(req.params.idCate,req.body);
        res.status(200).json({mess:'succsess'});
    },
    deleteCategory: async (req,res) => {
      await  methodCate.deleteCate(req.params.idCate);
      res.status(200).json({mess:'success'});
    }
}