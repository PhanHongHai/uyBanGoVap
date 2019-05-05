$(document).ready(function () {
    $('.pageCoDong .contentCoDong').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 13,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $(".owl-carousel").owlCarousel({
        animateOut: 'fadeOutLeft',
        animateIn: 'fadeInDown',
        items:1,
        margin:30,
        stagePadding:30,
        smartSpeed:250,
        slideTransition:'ease-out',
        autoplay:true,
        autoplayTimeout:4000,
        autoplaySpeed:true,
        loop:true,
        nav:true,
        navText:''
    });
    $('.owl-next').click(function() {
        $(".owl-carousel").trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.owl-prev').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        $(".owl-carousel").trigger('prev.owl.carousel', [300]);
    })
});
