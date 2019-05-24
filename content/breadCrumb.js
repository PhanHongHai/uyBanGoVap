const breadCrumb=[
    // admin
    {key:'/admin/tai-khoan',link:[{text:'Home',link:'/admin'},{text:'Tài Khoản',link:'/admin/tai-khoan'}]},
    {key:'/admin/tin-tuc/loai-danh-muc',link:[{text:'Home',link:'/admin'},{text:'Tin Tức',link:'/admin/tin-tuc'},{text:'Loại danh mục',link:'/admin/tin-tuc/loai-danh-muc'}]},
    {key:'/admin/tin-tuc/danh-muc',link:[{text:'Home',link:'/admin'},{text:'Tin Tức',link:'/admin/tin-tuc'},{text:'Danh Mục',link:'/admin/tin-tuc/danh-muc'}]},
    {key:'/admin/linh-vuc',link:[{text:'Home',link:'/admin'},{text:'Lĩnh Vực',link:'/admin/linh-vuc'}]},
    {key:'/admin/co-quan',link:[{text:'Home',link:'/admin'},{text:'Cơ quan ban hành',link:'/admin/co-quan'}]},

    // page
    {key:'/gop-y',link:[{text:'Trang chủ',link:'/'},{text:'Góp ý',link:'/gop-y'}]},
    {key:'/dich-vu-cong',link:[{text:'Trang chủ',link:'/'},{text:'',link:'/dich-vu-cong'}]},
    {key:'/cong-dan',link:[{text:'Trang chủ',link:'/'},{text:'Công dân',link:'/cong-dan'}]},
    {key:'/thu-tuc-hanh-chinh',link:[{text:'Trang chủ',link:'/'},{text:'Thủ tục hành chính',link:'/thu-tuc-hanh-chinh'}]},
];
module.exports=breadCrumb;