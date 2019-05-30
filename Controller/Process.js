// method model
const mongoose=require('mongoose');
const methodGY = require('../Model/GopY/Method');
const modelGY = require('../Model/GopY/FeedBack');
const modelNew=require('../Model/TinTuc/News');
const modelCate=require('../Model/DanhMuc/Category');

const modelCateType=require('../Model/LoaiDanhMuc/CategoryType');
// ----------------------------
const format = require('dateformat');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    //  load home2
    loadHome: async (req, res) => {
        const tinMoi =await modelNew.aggregate([
            {
                $lookup:{
                    from:'Category',
                    localField:'idCate',
                    foreignField:'_id',
                    as:'cate'
                }
            },
            {
                $sort:{postTime:-1}
            },
            {
                $limit:5
            }
        ]);
        const cate=await modelCate.aggregate([
            {
                $lookup:{
                    from:'News',
                    localField:'_id',
                    foreignField:'idCate',
                    as:'news'
                }
            }
        ])
        
        res.render('index', { title: 'Trang chủ-Công thông tin điện tử Gò Vấp',tinMoi:tinMoi,cate:cate });
      
    },
    loadBV:async (req,res) => {
        let id=mongoose.Types.ObjectId(req.params.idBV);
        const tinMoi =await modelNew.aggregate([
            {
                $lookup:{
                    from:'Category',
                    localField:'idCate',
                    foreignField:'_id',
                    as:'cate'
                }
            },
            {
                $sort:{postTime:-1}
            },
            {
                $limit:5
            }
        ]);
        console.log(tinMoi[0].cate[0]._id);
        const tinLQ=await modelNew.find({_id:{$ne:tinMoi[0]._id}}).sort({postTime:-1}).limit(4);
        console.log(tinLQ);
        const news=await modelNew.aggregate([
            {
                $match:{_id:id}
            },
            {
                $lookup:{
                    from:'Category',
                    localField:'idCate',
                    foreignField:'_id',
                    as:'cate'
                }
            }
        ]);
        const sideBar=await modelCateType.aggregate([
            {
                $lookup:{
                    from:'Category',
                    localField:'_id',
                    foreignField:'typeCate',
                    as:'cate'
                }
            }
        ]);
        res.render('baiViet', {
            title: 'Bài Viết-Công thông tin điện tử Gò Vấp',
            tinMoi:tinMoi,
            detail:news,
            kt:1,
            sideBar:sideBar,
            tinLQ:tinLQ
          });
    },
    loadDVC:async (req, res) => {
        let link = bread(req);
        modelCateType.aggregate([
            {
                $lookup:{
                    from:'Category',
                    localField:'_id',
                    foreignField:'typeCate',
                    as:'cate'
                }
            }
        ],(err,data) => {
            if(err) throw err;
            else{
                res.render('dichVuCong', { title: 'Dịch Vụ Công-Công thông tin điện tử Gò Vấp', link: link,sideBar:data,kt:1 });
            }
        })
        
    },
    loadCD: (req, res) => {
        let link = bread(req);
        modelCateType.aggregate([
            {
                $lookup:{
                    from:'Category',
                    localField:'_id',
                    foreignField:'typeCate',
                    as:'cate'
                }
            }
        ],(err,data) => {
            if(err) throw err;
            else{
                res.render('kenhTuongTac', { title: 'Công dân-Công thông tin điện tử Gò Vấp', link: link,sideBar:data,kt:0 });
            }
        })
      },
    loadGY:(req, res) => {
        let link = bread(req);
        modelCateType.aggregate([
            {
                $lookup:{
                    from:'Category',
                    localField:'_id',
                    foreignField:'typeCate',
                    as:'cate'
                }
            }
        ],(err,data) => {
            if(err) throw err;
            else{
                res.render('gopY', { title: 'Góp Ý-Công thông tin điện tử Gò Vấp', link: link,sideBar:data,check:req.session.mess,kt:1 });
            }
        })
      },
    // *************************
    /// GÓP Ý 
    createGopY: async (req, res) => {
        let now = new Date();
        let date = format(now, "h:MM tt ,d/mm/yyyy");
        console.log(date);
        let data = { ...req.body, ngay: date, file: req.file.filename };
        let gopY = await new modelGY(data);
        gopY.save((err) => {
            if (err) {
                req.session.mess = 0;
                res.redirect('/gop-y');
            }
            else {
                if (req.session.count == null)
                    req.session.count = 0;
                req.session.count += 1
                req.session.mess = 1;
                res.redirect('/gop-y');
            }

        });
    },
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            let list = await modelGY.find({}).sort({ ngay: -1 });
            if (req.session.count == null)
                req.session.count = 0;
            let link = bread(req);
            res.render('admin', { title: 'QL thư góp ý', link: link, user: req.user, list: list, path: 'GopY', count: req.session.count, mess: req.session.mess })
        }
        else
            res.redirect('/logIn');
    },
    downloadFile: async (req, res) => {
        let data = await modelGY.find({ _id: req.params.idGY });
        let filePath = "public/uploads/" + data[0].file;
        console.log(filePath);
        res.download(filePath, data[0].file);
    },
    sendImage: (req, res) => {
        res.status(200).json({ mess: 'success', data: req.file.filename });
    },
    getList: async (req, res) => {
        let numberPage = await modelGY.find().count();
        let list = await modelGY.find({}).sort({ ngay: -1 });
        let total = numberPage / 7;
        res.status(200).json({ total: total, data: list });
    },
    loadItem: async (req, res) => {
        if (req.isAuthenticated()) {
            let list = await modelGY.find({ _id: req.params.idGY });
            if (req.session.count == null)
                req.session.count = 0;
            let link = bread(req);
            res.render('admin', { title: 'QL thư góp ý', link: link, user: req.user, list: list, path: 'DetailEmail', count: req.session.count, mess: req.session.mess })
        }
        else
            res.redirect('/logIn');
    },
    updateCheck: (req, res) => {
        modelGY.findOneAndUpdate({ _id: req.params.idGY }, { $set: { check: false } }, (err) => {
            if (err)
                res.status(500).json({ mess: 'fail' });
            else {
                if (req.session.count > 0) {
                    req.session.count -= 1;
                }
                else
                    req.session.count = 0;
                res.status(200).json({ mess: 'success', count: req.session.count });
            }

        })
    },
    deleteGY: (req, res) => {
        modelGY.find({ _id: req.params.idGY }, (err, data) => {
            console.log(data);
            console.log(data[0].check);
            if (data[0].check) {
                if (req.session.count > 0) {
                    req.session.count -= 1;
                }
                else
                    req.session.count = 0;
                modelGY.findOneAndRemove({ _id: req.params.idGY }, (err) => {
                    console.log(req.session.count);
                    if (err)
                        res.status(500).json({ mess: 'fail' });
                    else
                        res.status(200).json({ mess: 'success' });
                })
            }
            else {
                modelGY.findOneAndRemove({ _id: req.params.idGY }, (err) => {
                    console.log(req.session.count);
                    if (err)
                        res.status(500).json({ mess: 'fail' });
                    else
                        res.status(200).json({ mess: 'success' });
                })

            }

        })
    }
}