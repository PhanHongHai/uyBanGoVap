var express = require('express');
var router = express.Router();
const {gioiThieu,tinTuc,quyHoach,congDan} = require('../content/sidebar');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ủy ban gò vấp', gt:gioiThieu,tt:tinTuc,qh:quyHoach,cd:congDan });
});

module.exports = router;
