const model = require('../Model/ThuTucHanhChinh/ThuTucHC');
const method = require('../Model/ThuTucHanhChinh/Method');
const modelLV = require('../Model/LinhVuc/Field');
const modelCQ = require('../Model/CoQuan/AgencyIssued');
const mongoose = require('mongoose');
const modelCateType = require('../Model/LoaiDanhMuc/CategoryType');
const modelCate = require('../Model/DanhMuc/Category');
const modelNew = require('../Model/TinTuc/News');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    getTT:async (req,res) => {
        let link = bread(req);
        let tinMoi = await modelNew.aggregate([
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
        ],async (err, data) => {
            if (err) throw err;
            else {
                let id = mongoose.Types.ObjectId(req.params.idTT);
                const list = await model.aggregate(
                    [
                        {
                            $match:{_id:id}
                        },
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

                    ]);
                res.render('ChiTietTTHC', { title: 'Thủ Tục Hành Chính - Công thông tin điện tử Gò Vấp', link: link,list:list,
                 sideBar: data, kt: 0,tinMoi:tinMoi,activeMenu: 4 });
            }
        })
    },
    loadThuTuc: async (req, res) => {
        if (req.isAuthenticated()) {
            let link = bread(req);
            const listLV = await modelLV.find();
            const listCQ = await modelCQ.find();
            // let list=await model.find().sort({_id:-1});
            const list = await model.aggregate(
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

                ]);
            res.render('admin', {
                title: 'QL Thủ Tục Hành Chính', link: link, user: req.user,
                list: list, listLV: listLV, listCQ: listCQ, path: 'ThuTucHanhChinh', count: req.session.count,
                mess: req.session.mess
            });
        }
        else
            res.redirect('/logIn');
    },
    loadTTHC: async (req, res) => {
        let link = bread(req);
        let tinMoi = await modelNew.aggregate([
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
        ],async (err, data) => {
            if (err) throw err;
            else {
                const list = await model.aggregate(
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

                    ]);
                res.render('thuTucHanhChinh', { title: 'Thủ Tục Hành Chính - Công thông tin điện tử Gò Vấp',
                 link: link,list:list , sideBar: data, kt: 0,activeMenu:4,cate:null, tinMoi:tinMoi });
            }
        })
    },
    addThuTuc: async (req, res) => {
        if (req.file) {
            let data = { ...req.body, linkFile: req.file.filename };
            method.addThuTuc(data);
            res.redirect('/admin/thu-tuc-hanh-chinh');
        }
        else {
            method.addThuTuc(req.body);
            res.redirect('/admin/thu-tuc-hanh-chinh');
        }
    },
    loadUpdateTT: async (req, res) => {
        if (req.isAuthenticated()) {
            let link = bread(req);
            const listLV = await modelLV.find();
            const listCQ = await modelCQ.find();
            let id = mongoose.Types.ObjectId(req.params.idTT);
            const list = await model.aggregate(
                [
                    { $match: { _id: id } },
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

                ]);
            res.render('admin', {
                title: 'QL Thủ Tục Hành Chính', link: link, user: req.user,
                list: list, listLV: listLV, listCQ: listCQ, path: 'UpdateTTHC', count: req.session.count,
                mess: req.session.mess
            });
        }
        else
            res.redirect('/logIn');
    },
    updateThuTuc: (req, res) => {
        if (req.file) {          
            let data = { ...req.body, linkFile: req.file.filename };
            method.updateThuTuc(req.params.idTT, data);
            res.status(200).redirect('/admin/thu-tuc-hanh-chinh');
        }
        else {
            method.updateThuTuc(req.params.idTT, req.body);
            res.status(200).redirect('/admin/thu-tuc-hanh-chinh');
        }
    },
    deleteThuTuc: async (req, res) => {
        await method.deleteThuTuc(req.params.idTT);
        res.status(200).json({ mess: "success" });
    },
    downloadFile:async (req,res) => {
        let data = await model.find({ _id: req.params.idTT });
        let filePath = "public/uploads/" + data[0].linkFile;
        res.download(filePath, data[0].linkFile);
    }
}