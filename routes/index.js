var express = require('express');
var router = express.Router();
var session = require('express-session')

// controller 
const ctrl=require('../Controller/Process');
//---------------
const BreadCrumb = require('../content/breadCrumb');
var multer  = require('multer')
// upload
const store= multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+ '-' + file.originalname  )
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
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Trang chủ-Công thông tin điện tử Gò Vấp' });
});
// kenh tuong tac
router.get('/cong-dan', (req, res) => {
  let link = bread(req);
  res.render('kenhTuongTac', { title: 'Công dân-Công thông tin điện tử Gò Vấp', link: link });
});
router.get('/gioi-thieu', (req, res) => {
  let link = bread(req);
  res.render('gioiThieu', { title: 'Giới Thiêu-Công thông tin điện tử Gò Vấp', link: link });
});
// thu tuc hanh chinh
router.get('/thu-tuc-hanh-chinh', (req, res) => {
  let link = bread(req);
  res.render('thuTucHanhChinh', { title: 'Thủ tục hành chính-Công thông tin điện tử Gò Vấp', link: link });
});

router.get('/bai-viet', (req, res) => {
  res.render('baiViet', {
    title: 'Bài Viết-Công thông tin điện tử Gò Vấp'
  });
});

router.get('/dich-vu-cong', (req, res) => {
  let link = bread(req);
  res.render('dichVuCong', { title: 'Dịch Vụ Công-Công thông tin điện tử Gò Vấp', link: link });
});

router.route('/gop-y')
  .get((req, res) => {
    let link = bread(req);
    res.render('gopY', { title: 'Góp Ý-Công thông tin điện tử Gò Vấp', link: link,check:req.session.mess });
  })
  .post(upload.single('file'),ctrl.createGopY)
router.get('/getSS',(req,res) => {
  res.send(req.session.count+'++'+req.session.mess);
})
router.get('/destroySS',(req,res) => {
  req.session.mess=2;
  res.status(200).json({check:req.session.mess});
})
module.exports = router;
