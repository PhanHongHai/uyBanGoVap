$(function(){
    // menu responsive
    $('.menu-box').slideUp();
    $('.menu .tab-menu img').click(function(event){
        $('.menu-box').slideToggle(500);
    });
    $('.menu .tab-menu a').click(function(event){
        $('.menu-box').slideToggle(500);
    });
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
        $('.hoatDong .contentCate .cateClassify').removeClass('activeCate');
        let result=".hoatDong .contentCate .cateClassify:nth-child("+(valueSubCate+1)+")";
        $(result).addClass('activeCate');
        $(".hoatDong .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.vanHoaXaHoi .headCate .subCate ul li').click(function(){
        let valueSubCate=$(this).index();
        $('.vanHoaXaHoi .contentCate .cateClassify').removeClass('activeCate');
        let result=".vanHoaXaHoi .contentCate .cateClassify:nth-child("+(valueSubCate+1)+")";
        $(result).addClass('activeCate');
        $(".vanHoaXaHoi .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.anNinh .headCate .subCate ul li').click(function(){
        let valueSubCate=$(this).index();
        $('.anNinh .contentCate .cateClassify').removeClass('activeCate');
        let result=".anNinh .contentCate .cateClassify:nth-child("+(valueSubCate+1)+")";
        $(result).addClass('activeCate');
        $(".anNinh .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.coSo .tabCoSo ul li').click(function(){
        let valueCS=$(this).index();
        $('.coSo .contentCs .allContentCoSo').removeClass('activeContentCS');
        let result=".coSo .contentCs .allContentCoSo:nth-child("+(valueCS+1)+")";
        $(result).addClass('activeContentCS');
        $(".coSo .tabCoSo ul li").removeClass('activeTabCS');
        $(this).addClass('activeTabCS');
    });
});