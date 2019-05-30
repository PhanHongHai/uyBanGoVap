const { validationResult } = require('express-validator/check');
let acc = require('../Model/Account/Account');
const BreadCrumb = require('../content/breadCrumb');

const method = require('../Model/Account/Method');


let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    logInAdmin: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('logIn', { title: 'Dang nhap', errs: errors.array() });
        }
        next();
    },
    // account 
    getAccount: async (username, password, done) => {
        let tk = await method.getAccountByUser(username);
        tk={...tk,pass:password};
        if (tk != null) {
            method.checkAccount(tk, done);
        }
    },
    getListAccount: async (req, res) => {
        let link = bread(req);
        if (req.isAuthenticated()) {
            if (req.session.mess == null)
                req.session.mess = 2;
            let tk = await acc.find();
            console.log(tk);
            res.render('admin', { title: 'QL Tài Khoản', link: link, user: req.user, acc: tk, path: "Account", count: req.session.count, mess: req.session.mess });
        }
        else
            res.redirect('/login');
    },
    checkAccount: async (name, done) => {
        let tk = await acc.find({ username: name });
        if (tk)
            return done(null, tk[0]);
        else
            return done(null, false);
    },
    addAccount:async (req, res) => {
        let us = req.body.username;
        let pass = req.body.password;
        let role = req.body.role;
        let kt = await method.addAccount(us, pass, role);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
        }
        req.session.mess = 0;
    },
    updateAccount:async (req, res) => {
        let kt = await method.updateAccount(req.params.idAcc,req.body.username,req.body.password,req.body.role);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
            res.status(200).json({ mess: 'success' })
        } else {
            req.session.mess = 0;
            res.status(500).json({ mess: 'fail' })
        }

    },
    deleteAccount:async (req, res) => {
        let kt =await method.deleteAccount(req.params.idAcc);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
            res.status(200).json({ mess: 'success' })
        } else {
            req.session.mess = 0;
            res.status(500).json({ mess: 'fail' })
        }
    }
    // end account
}