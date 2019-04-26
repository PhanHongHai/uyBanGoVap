$(function(){
    $('.menu-box').slideUp();
    $('.menu .tab-menu img').click(function(event){
        $('.menu-box').slideToggle(500);
    });
    $('.menu .tab-menu a').click(function(event){
        $('.menu-box').slideToggle(500);
    });
});