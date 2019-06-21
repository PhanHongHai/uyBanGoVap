var express = require('express');
var router = express.Router();
var session = require('express-session')

// controller 
const adminCtrl = require('../Controller/ProcessAdmin');
const cateTypeCtrl = require('../Controller/LoaiDanhMuc');
const cateCtrl = require('../Controller/DanhMuc');
const fieldCtrl = require('../Controller/LinhVuc');
const agencyCtrl = require('../Controller/Agency');
const ctrl = require('../Controller/Process');
const newCtrl = require('../Controller/News');
const ttCtrl = require('../Controller/ThuTucHanhChinh');
const modelCate = require('../Model/DanhMuc/Category');
const modelCateType = require('../Model/LoaiDanhMuc/CategoryType');
//---------------
const BreadCrumb = require('../content/breadCrumb');
var multer = require('multer')
// upload
const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

let upload = multer({ storage: store });

//----------
router.use(session({
  secret: 'govap',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 1000 },
}))
// session 
// -------

let bread = (req) => {
  return BreadCrumb.find((item) => item.key === req.path);
}

/* GET home page. */
router.get('/', ctrl.loadHome);
// load bai viet
router.route('/danh-muc*/bai-viet*.:idBV')
  .get(ctrl.loadBV)
  .post(ctrl.comment)
// comment
router.get('/bai-viet/getListComment/:idBV',ctrl.getListComment)
// kenh tuong tac-- cong dan
router.get('/cong-dan', ctrl.loadCD);
// gioi thieu
router.get('/gioi-thieu', ctrl.loadPageGT);
router.get('/gioi-thieu/getList', ctrl.getListGT)
//  tin tuc su kien
router.get('/tin-tuc-su-kien', ctrl.loadPageTTSK);
router.get('/tin-tuc-su-kien/getList', ctrl.getListTTSK);
// quy hoach phat trien
router.get('/quy-hoach-va-phat-trien', ctrl.loadPageQHPT);
router.get('/quy-hoach-va-phat-trien/getList', ctrl.getListQHPT);
// thu tuc hanh chinh
router.get('/cong-dan/thu-tuc-hanh-chinh', ttCtrl.loadTTHC);
router.get('/cong-dan/thu-tuc-hanh-chinh/:idTT', ttCtrl.getTT)
// tim kiem
router.post('/tim-kiem',ctrl.search);



router.get('/cong-dan/dich-vu-cong', ctrl.loadDVC);

//  danh muc
router.get('/danh-muc*.:idDM', ctrl.loadPageByCate)
router.get('/getListNewsCate/:idCate', ctrl.getNewsCate)
// **************************
router.route('/cong-dan/gop-y')
  .get(ctrl.loadGY)
  .post(upload.single('file'), ctrl.createGopY)
router.get('/getSS', (req, res) => {
  res.send(req.session.count + '++' + req.session.mess);
})
router.get('/destroySS', (req, res) => {
  req.session.mess = 2;
  res.status(200).json({ check: req.session.mess });
})
module.exports = router;
