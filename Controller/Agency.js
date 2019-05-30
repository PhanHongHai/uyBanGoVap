const methodAg=require('../Model/CoQuan/Method');
const model=require('../Model/CoQuan/AgencyIssued');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports={
    loadPage:async (req,res) => {
        if (req.isAuthenticated()) {
            let link = bread(req);
            let list = await model.find();
            res.render('admin',{ title: 'QL Cơ quan ban hành', link: link, user: req.user, list: list ,path:'Agency',count:req.session.count,mess:req.session.mess })
        }
        else
            res.redirect('/login');
    },
    addAgency: async (req,res) => {
        let val= await model.find({nameAg:req.body.nameAg});
        console.log(val);
        console.log(req.body);
        if(val.length == 0){
            console.log('1');
            methodAg.addAgency(req.body);
            res.redirect('/admin/co-quan-ban-hanh');
          
        }
        else{
            res.redirect('/admin/co-quan-ban-hanh');
        }
           
    },
    updateAgency:async (req,res) => {
        let val= await model.find({nameAg:req.body.nameAg});
        if(val.length == 0){
            methodAg.updateAgency(req.body,req.params.idAg);
            res.status(200).json({mess:'susscess'});
        }
        else
            res.status(500).json({mess:'fail'});
    },
    deleteAgency: async (req,res) => {
       await methodAg.deleteAgency(req.params.idAg);
       res.status(200).json({mess:"success"});
    }
}