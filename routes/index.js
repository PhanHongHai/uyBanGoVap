var express = require('express');
var router = express.Router();
let {sideBarCongDan,gioiThieu,tinTuc,uyBan}=require('../content/sidebar');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang chủ-Công thông tin điện tử Gò Vấp'});
});
// kenh tuong tac
router.get('/cong-dan',(req,res) => {
 res.render('kenhTuongTac',{title:'Công dân-Công thông tin điện tử Gò Vấp',
 sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:0});
});
router.get('/gioi-thieu',(req,res) => {
 res.render('gioiThieu',{title:'Giới Thiêu-Công thông tin điện tử Gò Vấp',
 sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:1});
});
// thu tuc hanh chinh
router.get('/thu-tuc-hanh-chinh',(req,res) => {
  res.render('thuTucHanhChinh',{title:'Thủ tục hành chính-Công thông tin điện tử Gò Vấp',
  sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:0});
 });
 router.get('/bai-viet',(req,res) => {
  res.render('baiViet',{title:'Bài Viết-Công thông tin điện tử Gò Vấp',
  sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:1});
 });

 router.get('/dich-vu-cong',(req,res) => {
  res.render('dichVuCong',{title:'Dịch Vụ Công-Công thông tin điện tử Gò Vấp',
  sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:0});
 });
 router.get('/hoi-dap',(req,res) => {
  res.render('hoiDap',{title:'Hỏi Đáp-Công thông tin điện tử Gò Vấp',
  sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:0});
 });
 router.get('/gop-y',(req,res) => {
  res.render('gopY',{title:'Góp Ý-Công thông tin điện tử Gò Vấp',
  sideBarCongDan:sideBarCongDan,gioiThieu:gioiThieu,tinTuc:tinTuc,uyBan:uyBan,check:0});
 });

module.exports = router;
