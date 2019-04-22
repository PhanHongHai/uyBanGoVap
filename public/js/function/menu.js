$(function(){
    $('.subMenu').slideUp();
    $('.menu ul li a').click(function(event){
        var n = $(this).index();
        $(this).next().slideToggle(500);
        $('.menu ul li a i.fa-angle-down').removeClass('fa-angle-right');
        $('i.iconMenu:nth-child('+n+')').addClass('fa-angle-down');
    });
});