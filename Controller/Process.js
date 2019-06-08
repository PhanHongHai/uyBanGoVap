// method model
const mongoose = require('mongoose');
const methodGY = require('../Model/GopY/Method');
const modelGY = require('../Model/GopY/FeedBack');
const modelNew = require('../Model/TinTuc/News');
const modelCate = require('../Model/DanhMuc/Category');

const modelCateType = require('../Model/LoaiDanhMuc/CategoryType');
// ----------------------------
const format = require('dateformat');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    //  load home2
    loadHome: async (req, res) => {
        const tinMoi = await modelNew.aggregate([
            {
                $lookup: {
                    from: 'Category',
                    localField: 'idCate',
                    foreignField: '_id',
                    as: 'cate'
                }
            },
            {
                $sort: { postTime: -1 }
            },
            {
                $limit: 5
            }
        ]);
        let uyBan = await modelCate.find({ nameCate: "ỦY BAN NHÂN DÂN" });
        let dangBo = await modelCate.find({ nameCate: "HOẠT ĐỘNG ĐẢNG BỘ" });
        let vh = await modelCate.find({ nameCate: "VĂN HÓA - XÃ HỘI" });
        let dhnt = await modelCate.find({ nameCate: "ĐIỂN HÌNH NGƯỜI TỐT VIỆC TỐT" });
        let ns = await modelCate.find({ nameCate: "NẾP SỐNG VĂN MINH ĐÔ THỊ" });
        let gt = await modelCate.find({ nameCate: "AN TOÀN GIAO THÔNG" });
        let an = await modelCate.find({ nameCate: "AN NINH TRẬT TỰ" });
        let pc = await modelCate.find({ nameCate: "PHÒNG CHÁY CHỮA CHÁY" });
        let kt = await modelCate.find({ nameCate: "KINH TẾ - DOANH NGHIỆP" });
        // id 
      /*  if (uyBan.length != 0 && dangBo.length != 0 && vh.length != 0 && dhnt.length != 0 && ns.length != 0
            && gt.length != 0 && an.length != 0 && pc.length != 0) { */
            let idUB = mongoose.Types.ObjectId(uyBan[0]._id);
            let idDB = mongoose.Types.ObjectId(dangBo[0]._id);
            let idVH = mongoose.Types.ObjectId(vh[0]._id);
            let idDHNT = mongoose.Types.ObjectId(dhnt[0]._id);
            let idNS = mongoose.Types.ObjectId(ns[0]._id);
            let idGT = mongoose.Types.ObjectId(gt[0]._id);
            let idAN = mongoose.Types.ObjectId(an[0]._id);
            let idPC = mongoose.Types.ObjectId(pc[0]._id);
            let idKT = mongoose.Types.ObjectId(kt[0]._id);
            // data
            let dataUB = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idUB }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataDB = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idDB }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataVH = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idVH }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataDHNT = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idDHNT }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataNS = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idNS }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataGT = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idGT }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataAN = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idAN }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataPC = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idPC }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let dataKT = await modelNew.aggregate([
                {
                    $lookup: {
                        from: 'Category',
                        localField: 'idCate',
                        foreignField: '_id',
                        as: 'cate'
                    }
                },
                {
                    $match: { idCate: idKT }
                }
                ,
                {
                    $sort: { postTime: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            let cate = await modelCate.aggregate([
                {
                    $lookup: {
                        from: 'News',
                        localField: '_id',
                        foreignField: 'idCate',
                        as: 'news'
                    }
                },
                {
                    $sort: { nameType: -1 }
                }
            ]);
            res.render('index', {
                title: 'Trang chủ-Công thông tin điện tử Gò Vấp', tinMoi: tinMoi, db: dataDB, ub: dataUB, vh: dataVH,
                dhnt: dataDHNT, ns: dataNS, gt: dataGT, an: dataAN, pc: dataPC, kt:dataKT, cate: cate, activeMenu:0
            });





    },
    loadBV: async (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idBV);
        const tinMoi = await modelNew.aggregate([
            {
                $lookup: {
                    from: 'Category',
                    localField: 'idCate',
                    foreignField: '_id',
                    as: 'cate'
                }
            },
            {
                $sort: { postTime: -1 }
            },
            {
                $limit: 5
            }
        ]);
        const tinLQ = await modelNew.find({ _id: { $ne: tinMoi[0]._id } }).sort({ postTime: -1 }).limit(4);
        const news = await modelNew.aggregate([
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: 'Category',
                    localField: 'idCate',
                    foreignField: '_id',
                    as: 'cate'
                }
            }
        ]);
        const sideBar = await modelCateType.aggregate([
            {
                $lookup: {
                    from: 'Category',
                    localField: '_id',
                    foreignField: 'typeCate',
                    as: 'cate'
                }
            },
            {
                $sort: { nameType: -1 }
            }
        ]);
        res.render('baiViet', {
            title: 'Bài Viết-Công thông tin điện tử Gò Vấp',
            tinMoi: tinMoi,
            detail: news,
            kt: 1,
            sideBar: sideBar,
            tinLQ: tinLQ
        });
    },
    loadDVC: async (req, res) => {
        let link = bread(req);
        modelCateType.aggregate([
            {
                $lookup: {
                    from: 'Category',
                    localField: '_id',
                    foreignField: 'typeCate',
                    as: 'cate'
                }
            },
            {
                $sort: { nameType: -1 }
            }
        ], (err, data) => {
            if (err) throw err;
            else {
                res.render('dichVuCong', { title: 'Dịch Vụ Công-Công thông tin điện tử Gò Vấp', link: link, sideBar: data, kt: 1 });
            }
        })

    },
    loadCD: (req, res) => {
        let link = bread(req);
        modelCateType.aggregate([
            {
                $lookup: {
                    from: 'Category',
                    localField: '_id',
                    foreignField: 'typeCate',
                    as: 'cate'
                }
            },
            {
                $sort: { nameType: -1 }
            }
        ], (err, data) => {
            if (err) throw err;
            else {
                res.render('kenhTuongTac', { title: 'Công dân-Công thông tin điện tử Gò Vấp', link: link, sideBar: data, kt: 0, activeMenu:4 });
            }
        })
    },
    loadGY: (req, res) => {
        let link = bread(req);
        modelCateType.aggregate([
            {
                $lookup: {
                    from: 'Category',
                    localField: '_id',
                    foreignField: 'typeCate',
                    as: 'cate'
                }
            },
            {
                $sort: { nameType: -1 }
            }
        ], (err, data) => {
            if (err) throw err;
            else {
                res.render('gopY', { title: 'Góp Ý-Công thông tin điện tử Gò Vấp', link: link, sideBar: data,
                 check: req.session.mess, kt: 1, activeMenu:1 });
            }
        })
    },
    // *************************
    /// GÓP Ý 
    createGopY: async (req, res) => {
        let now = new Date();
        let date = format(now, "h:MM tt ,d/mm/yyyy");
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
            if (data[0].check) {
                if (req.session.count > 0) {
                    req.session.count -= 1;
                }
                else
                    req.session.count = 0;
                modelGY.findOneAndRemove({ _id: req.params.idGY }, (err) => {
                    if (err)
                        res.status(500).json({ mess: 'fail' });
                    else
                        res.status(200).json({ mess: 'success' });
                })
            }
            else {
                modelGY.findOneAndRemove({ _id: req.params.idGY }, (err) => {
                    if (err)
                        res.status(500).json({ mess: 'fail' });
                    else
                        res.status(200).json({ mess: 'success' });
                })

            }

        })
    }
}