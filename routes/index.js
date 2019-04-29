var express = require('express');
var router = express.Router();
const {gioiThieu,tinTuc,quyHoach,congDan} = require('../content/sidebar');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang chủ- Công thông tin điện tử Gò Vấp'});
});

module.exports = router;
