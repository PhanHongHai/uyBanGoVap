var express = require('express');
var router = express.Router();
const { check } = require('express-validator/check');
const BreadCrumb = require('../content/breadCrumb');
const newsCtrl= require('../Controller/BaiViet');

let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
router.use(bodyParser.urlencoded({ extended: true }));
router.route('/admin/tin-tuc/bai-viet')
    .get(newsCtrl.loadBaiViet)