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
// --------------------
// --------------------
// setup
const { check } = require('express-validator/check');
const passPort = require('passport');
const passPortLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const BreadCrumb = require('../content/breadCrumb');
//-----------------------
//-----------------------
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}

router.use(session({
    secret: 'something',
    cookie: { maxAge: 1000 * 60 * 20 },
    proxy: true,
    resave: false,
    saveUninitialized: true
}))
router.use(bodyParser.urlencoded({ extended: true }));
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
        , passPort.authenticate('local', { failureRedirect: '/login', successRedirect: '/admin' }))
passPort.use('local', new passPortLocal(adminCtrl.getAccount));
passPort.serializeUser((tk, done) => {
    done(null, tk.username);
});
passPort.deserializeUser(adminCtrl.checkAccount);
// load admin
router.route('/admin')
    .get((req, res) => {
        if (req.session.count == null)
            req.session.count = 0;
        let link = bread(req);
        if (req.isAuthenticated()) {

            res.render('admin', { title: 'Admin', link: link, user: req.user, path: 'empty', count: req.session.count });
        }
        else
            res.redirect('/login');
    });
// load page
router.route('/admin/tai-khoan')
    .get(adminCtrl.getListAccount)
    .post([
        check('username')
            .isLength({ min: 2, max: 20 }).withMessage('Nhập username tối thiểu 2 và tối đa là 20 ký tự'),
        check('password').isLength({ min: 2, max: 20 }).withMessage('Nhập password tối thiểu 2 và tối đa là 20 ký tự')
    ], adminCtrl.addAccount);
// -----------------------


router.route('/admin/tai-khoan/:idAcc')
    .put(adminCtrl.updateAccount)
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
router.route('/admin/tin-tuc/bai-viet')
    .get(newCtrl.loadPage)
    .post()
router.route('/admin/tin-tuc/bai-viet/:idBV')
    .get()
    .patch(newCtrl.updateNews)
    .delete(newCtrl.deleteNews)

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
router.route('/admin/gop-y/:idGY')
    .get()
    .patch(gopYCtrl.updateCheck)
    .delete(gopYCtrl.deleteGY)
// -----------------


module.exports = router;
