var express = require('express');
var router = express.Router();

// controller
const adminCtrl = require('../Controller/ProcessAdmin');
const cateTypeCtrl = require('../Controller/LoaiDanhMuc');
const cateCtrl = require('../Controller/DanhMuc');
const fieldCtrl = require('../Controller/LinhVuc');
const agencyCtrl = require('../Controller/Agency');
const gopYCtrl = require('../Controller/Process');
const newCtrl=require('../Controller/News');
const ttCtrl=require('../Controller/ThuTucHanhChinh');
const upload_img=require('../Controller/img_upload');
const blCtrl=require('../Controller/BinhLuan');
// --------------------
// --------------------
// setup
const { check } = require('express-validator/check');
const passPort = require('passport');
const passPortLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const BreadCrumb = require('../content/breadCrumb');
var path = require("path");
var fs = require("fs");
var multer  = require('multer')
// upload



const store= multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname  )
  }
});
var fileFilter=(req,file,cb) => {
    if(!file.originalname.match(/\.(jpg|png|jpeg)$/))
        cb(new Error('Bạn chỉ được upload file ảnh'));
    else
        cb(null,true);
}
var fileFilterDoc=(req,file,cb) => {
    if(!file.originalname.match(/\.(docx|pdf)$/))
        cb(new Error('Bạn chỉ được upload file document'));
    else
        cb(null,true);
}
let upload = multer({ storage: store,fileFilter:fileFilter });
let uploadDoc = multer({ storage: store,fileFilter:fileFilterDoc });
//-----------------------
//-----------------------

let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
router.use(session({
    secret: 'something',
    cookie: { maxAge: 1000 * 60 * 3600 },
    proxy: true,
    resave: false,
    saveUninitialized: true
}))

router.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
router.use(bodyParser.json({limit: '50mb'}));
router.use(passPort.initialize());
router.use(passPort.session());
// admin login
router.route('/login')
    .get((req, res) => {
        res.render('logIn', { title: 'Đăng nhập', errs: null });
    })
    // verify account
    .post([
        check('username').isLength({ min: 2, max: 20 })
            .withMessage('Nhập username tối thiểu 2 và tối đa là 20 ký tự'),
        check('password').isLength({ min: 2, max: 20 })
            .withMessage('Nhập password tối thiểu 2 và tối đa là 20 ký tự')
    ], adminCtrl.logInAdmin
        , passPort.authenticate('local', { failureRedirect: '/login', successRedirect: '/admin'}))
passPort.use('local', new passPortLocal(adminCtrl.getAccount));
passPort.serializeUser((tk, done) => {
    done(null, tk.username);
});
passPort.deserializeUser(adminCtrl.checkAccount);
router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/login');
})
// load admin
router.route('/admin')
    .get((req, res) => {
        if (req.session.count == null)
            req.session.count = 0;
        let link = bread(req);
        if (req.isAuthenticated()) {

            res.render('admin', { title: 'Admin', link: link, user: req.user, path: 'empty', count: req.session.count,mess:req.session.mess });
        }
        else
            res.redirect('/login');
    });
// load page account
router.route('/admin/tai-khoan')
    .get(adminCtrl.getListAccount)
    .post(adminCtrl.addAccount);
// -----------------------


router.route('/admin/tai-khoan/:idAcc')
    .patch(adminCtrl.updateAccount)
    .delete(adminCtrl.deleteAccount)

// loai danh muc
router.route('/admin/tin-tuc/loai-danh-muc')
    .get(cateTypeCtrl.loadCateType)
    .post(cateTypeCtrl.addCateType)
// -----------------------

router.route('/admin/tin-tuc/loai-danh-muc/:idType')
    .patch(cateTypeCtrl.updateCateType)
    .delete(cateTypeCtrl.deleteCateType)
// danh muc

router.route('/admin/tin-tuc/danh-muc')
    .get(cateCtrl.loadCategory)
    .post(cateCtrl.addCategory)
router.route('/admin/tin-tuc/danh-muc/:idCate')
    .get()
    .patch(cateCtrl.updateCategory)
    .delete(cateCtrl.deleteCategory)
// -----------------------

// bai viet

router.post('/admin/tin-tuc/bai-viet/loadUpdate/upload',(req,res) => {
    upload_img(req, function(err, data) {
        if (err) {
          return res.status(404).end(JSON.stringify(err));
        }
    
        res.send(data);
      });
})
router.post('/admin/tin-tuc/upload',(req,res) => {
    upload_img(req, function(err, data) {
        if (err) {
          return res.status(404).end(JSON.stringify(err));
        }
    
        res.send(data);
      });
})
router.post('/admin/tin-tuc/bai-viet/upload',(req,res) => {
    upload_img(req, function(err, data) {
        if (err) {
          return res.status(404).end(JSON.stringify(err));
        }
    
        res.send(data);
      });
})
var filesDir = path.join(path.dirname(require.main.filename), "/public/");

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}
router.get('/admin/tin-tuc/bai-viet/getList',newCtrl.getList)
router.get('/admin/tin-tuc/bai-viet/loadUpdate/:idBV',newCtrl.loadUpdate)
router.route('/admin/tin-tuc/bai-viet')
    .get(newCtrl.loadPage)
    .post(upload.single('linkImg'),newCtrl.addNews)
router.route('/admin/tin-tuc/bai-viet/:idBV')
    .get()
    .post(upload.single('linkImg'),newCtrl.updateNews)
    .delete(newCtrl.deleteNews)

// comment
router.get('/admin/binh-luan',blCtrl.loadPage)
router.route('/admin/binh-luan/:idCM')
    .delete()
//********************************* */

//****************************************** */
// linh vuc
router.route('/admin/linh-vuc')
    .get(fieldCtrl.loadLinhVuc)
    .post(fieldCtrl.addLV)
router.route('/admin/linh-vuc/:idLV')
    .get()
    .patch(fieldCtrl.updateLV)
    .delete(fieldCtrl.deleteLV)
// ----------------------
// co quan ban hanh
router.route('/admin/co-quan-ban-hanh')
    .get(agencyCtrl.loadPage)
    .post(agencyCtrl.addAgency)
router.route('/admin/co-quan-ban-hanh/:idAg')
    .get()
    .patch(agencyCtrl.updateAgency)
    .delete(agencyCtrl.deleteAgency)
// -------------------
// thu gop y
router.route('/admin/gop-y').get(gopYCtrl.loadPage)
router.route('/admin/gop-y/download/:idGY').get(gopYCtrl.downloadFile)
router.route('/admin/gop-y/getList').get(gopYCtrl.getList)
router.route('/admin/gop-y/:idGY')
    .get(gopYCtrl.loadItem)
    .patch(gopYCtrl.updateCheck)
    .delete(gopYCtrl.deleteGY)
// -----------------
// thu tuc hanh chinh
router.route('/admin/thu-tuc-hanh-chinh')
    .get(ttCtrl.loadThuTuc)
    .post(uploadDoc.single('file'),ttCtrl.addThuTuc)
router.get('/admin/thu-tuc-hanh-chinh/loadUpdate/:idTT',ttCtrl.loadUpdateTT)
router.get('/thu-tuc-hanh-chinh/download/:idTT',ttCtrl.downloadFile)
router.route('/admin/thu-tuc-hanh-chinh/:idTT')
    .get()
    .post(uploadDoc.single('file'),ttCtrl.updateThuTuc)
    .delete(ttCtrl.deleteThuTuc)
//***************************** */

router.get('/destroyMess',(req,res) => {
    req.session.mess=0;
    res.status(200).json({mess:'da xoa'});
})
router.get('/getMess',(req,res) => {
    res.send('gia tri--'+req.session.mess);
})
module.exports = router;
