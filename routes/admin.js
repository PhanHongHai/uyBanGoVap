var express = require('express');
var router = express.Router();
const adminCtrl = require('../Controller/ProcessAdmin');
const { check } = require('express-validator/check');
const passPort = require('passport');
const passPortLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const BreadCrumb = require('../content/breadCrumb');

let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}

router.use(session({
    secret: 'something',
    cookie: { maxAge: 1000 * 60 * 10 },
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
        if (req.isAuthenticated()) {
            console.log(req.user);
            res.render('admin', { title: 'Admin', user: req.user });
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
router.route('/admin/tai-khoan/:idAcc')
    .put(adminCtrl.updateAccount)
    .delete(adminCtrl.deleteAccount)
module.exports = router;
