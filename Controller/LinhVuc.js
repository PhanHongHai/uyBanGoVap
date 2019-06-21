const BreadCrumb = require('../content/breadCrumb');
const modelLV=require('../Model/LinhVuc/Field');
const methodLV=require('../Model/LinhVuc/Method');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports={
    loadLinhVuc:async (req,res) => {
        if (req.isAuthenticated()) {
            let link = bread(req);
            let list = await modelLV.find({});
            res.render('admin', { title: 'QL Lĩnh Vực', link: link, user: req.user, list: list,path:'Fields',count:req.session.count,mess:req.session.mess });
        }
        else {
            res.redirect('/login');
        }
    },
    addLV:async (req,res) => {
    const check=await methodLV.addLV(req.body);
    if(check)
        res.status(500);
    res.status(200).redirect('/admin/linh-vuc');
    },
    updateLV:async (req,res) => {
      await methodLV.updateLV(req.params.idLV,req.body);
        res.status(200).json({mess:'success'});
    },
    deleteLV:async (req,res) => {
        methodLV.deleteLV(req.params.idLV);
       await res.status(200).json({mess:'success'});
    }
}