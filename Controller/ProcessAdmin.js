const { validationResult } = require('express-validator/check');
let acc = require('../Model/Account/Account');
const BreadCrumb = require('../content/breadCrumb');

const method= require('../Model/Account/Method');


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
            if (tk != null) {
              method.checkAccount(tk,done);
            }
       

    },
    getListAccount: async (req, res) => {
        let link = bread(req);
        if (req.isAuthenticated()) {
            let tk = await acc.find();
            console.log(tk);
            res.render('admin', { title: 'QL Tài Khoản', link: link, user: req.user, acc: tk,path:"Account",count:req.session.count});
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
    addAccount: (req, res) => {
        let us = req.body.username;
        let pass = req.body.password;
        let role = req.body.role;
        method.addAccount(us,pass,role);
    },
    updateAccount: (req,res) => {
        console.log(req.data);
        method.updateAccount(req.body)
    },
    deleteAccount: (req,res) => {
        method.deleteAccount(req.params.idAcc);
         res.status(200).json({mess:'success'});
    }
    // end account
}