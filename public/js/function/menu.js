$(function(){
    // menu responsive
    $('.menu-box').slideUp();
    $('.menu .tab-menu img').click(function(event){
        $('.menu-box').slideToggle(500);
    });
    $('.menu .tab-menu a').click(function(event){
        $('.menu-box').slideToggle(500);
    });
    // menu  fix
    $(window).scroll(function(event) {
        var vitri=$("html").scrollTop();
        console.log(vitri);
		if(vitri > 113){
			$('.menu').addClass('menuZoom animated fadeInDown');
		}
		else if(vitri < 100){
			$('.menu').removeClass('menuZoom animated fadeInDown');
		}
	});
    /// smooth scroll
    SmoothScroll({
        keyboardSupport: true,
        animationTime    : 500, // [ms]
        stepSize         : 100, });
    // tab news
    $('.nameTab button').click(function(){
        let giaTriTab =$(this).index();
        $('.nameTab .btn').removeClass('activeTab');
        $('.newTab .imageNewTab .classifyNews').removeClass('activeClassify');
        $(this).addClass('activeTab');
        $('.contentTab .tab').removeClass('activeContentNew');
        let vlaue=".contentTab .tab:nth-child("+(giaTriTab+1)+")";
        let vlaue1=".newTab .imageNewTab .classifyNews:nth-child("+(giaTriTab+1)+")";
        $(vlaue).addClass('activeContentNew');
        $(vlaue1).addClass('activeClassify');
    });
    $('.contentTab .activeContentNew ul li').hover(function(){
        let giaTriListItem=$(this).index();
        $('.imageNewTab .newImage').removeClass('activeImageNew');
        $(".imageNewTab .newImage:nth-child("+(giaTriListItem+1)+")").addClass('activeImageNew');
        
    });
    $('.hoatDong .headCate .subCate ul li').click(function(){
        let valueSubCate=$(this).index();
        $('.hoatDong .contentCate .cateClassify').removeClass('activeCate animated fadeInUp');
        let result=".hoatDong .contentCate .cateClassify:nth-child("+(valueSubCate+1)+")";
        $(result).addClass('activeCate animated fadeInUp');
        $(".hoatDong .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.vanHoaXaHoi .headCate .subCate ul li').click(function(){
        let valueSubCate=$(this).index();
        $('.vanHoaXaHoi .contentCate .cateClassify').removeClass('activeCate animated fadeInUp');
        let result=".vanHoaXaHoi .contentCate .cateClassify:nth-child("+(valueSubCate+1)+")";
        $(result).addClass('activeCate animated fadeInUp');
        $(".vanHoaXaHoi .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.anNinh .headCate .subCate ul li').click(function(){
        let valueSubCate=$(this).index();
        $('.anNinh .contentCate .cateClassify').removeClass('activeCate animated fadeInUp');
        let result=".anNinh .contentCate .cateClassify:nth-child("+(valueSubCate+1)+")";
        $(result).addClass('activeCate animated fadeInUp');
        $(".anNinh .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.coSo .tabCoSo ul li').click(function(){
        let valueCS=$(this).index();
        $('.coSo .contentCs .allContentCoSo').removeClass('activeContentCS animated fadeInUp');
        let result=".coSo .contentCs .allContentCoSo:nth-child("+(valueCS+1)+")";
        $(result).addClass('activeContentCS animated fadeInUp');
        $(".coSo .tabCoSo ul li").removeClass('activeTabCS');
        $(this).addClass('activeTabCS');
    });
});