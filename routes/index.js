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
const newCtrl=require('../Controller/News');
const ttCtrl=require('../Controller/ThuTucHanhChinh');
const modelCate=require('../Model/DanhMuc/Category');

const modelCateType=require('../Model/LoaiDanhMuc/CategoryType');
//---------------
const BreadCrumb = require('../content/breadCrumb');
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
router.get('/',ctrl.loadHome );
// load bai viet
router.get('/bai-viet/*.:idBV',ctrl.loadBV)
// kenh tuong tac
router.get('/cong-dan',ctrl.loadCD);
router.get('/gioi-thieu', (req, res) => {
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
        res.render('gioiThieu', { title: 'Giới Thiêu-Công thông tin điện tử Gò Vấp', link: link,sideBar:data,kt:1 });
    }
})

});
// thu tuc hanh chinh
router.get('/thu-tuc-hanh-chinh', (req, res) => {
  let link = bread(req);
  res.render('thuTucHanhChinh', { title: 'Thủ tục hành chính-Công thông tin điện tử Gò Vấp', link: link });
});


router.get('/dich-vu-cong',ctrl.loadDVC);

router.route('/gop-y')
  .get(ctrl.loadGY)
  .post(upload.single('file'),ctrl.createGopY)
router.get('/getSS',(req,res) => {
  res.send(req.session.count+'++'+req.session.mess);
})
router.get('/destroySS',(req,res) => {
  req.session.mess=2;
  res.status(200).json({check:req.session.mess});
})
module.exports = router;
