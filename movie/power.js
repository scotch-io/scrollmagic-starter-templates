/*===================================
=            GLOBAL VARS            =
===================================*/
var scrollMagicController, imageScene, navScene;
var currentImage = { curImg: 0 };
var topperHeight = $(window).height() - $('nav').outerHeight();


/*====================================
=            ON DOM READY            =
====================================*/
$(function() {

    $('.skip-to-content').click(function() {
        $('#scroll-wrap').animate({
            scrollTop: topperHeight * 2
        }, 1000);

        return false;
    });

});

/*======================================
=            ON WINDOW LOAD            =
======================================*/
$(window).load(function() {

    $('#loader').fadeOut(500);

    // Topper Height
    $('#topper .wrap').css('height', $(window).height() - $('nav').outerHeight() +'px');

    //  Create ScrollMagic Controller
    scrollMagicController = new ScrollMagic({
        container: '#scroll-wrap',
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

    // Put all image sequences in a big fat array and remove them from the DOM
    var topperImages = [];
    $('#topper img.sequence').each(function() {
        topperImages.push($(this).attr('src'));
        $(this).remove();
    });

    // Create image sequence animation
    var imageAnimation = TweenMax.to(currentImage, 0.5, {
        curImg: topperImages.length - 1,
        roundProps: 'curImg',
        repeat: 0,
        immediateRender: true,
        ease: Linear.easeNone,
        onUpdate: function () {
            $('#image-movie').attr('src', topperImages[currentImage.curImg]);
        }
    });


    function getTopperHeight() {
        return topperHeight;
    }
    $(window).resize(function() {
        topperHeight = $(window).height() - $('nav').outerHeight();
        $('#topper .wrap').css('height', $(window).height() - $('nav').outerHeight() +'px');

        // Force better DOM repainting hack. Helps on mobile
        $('html').addClass('force-gpu').removeClass('force-gpu');
    });

    // Scene for Animation
    imageScene = new ScrollScene({
        triggerElement: '#topper',
        offset: -1,
        duration: getTopperHeight
    })
    .addTo(scrollMagicController)
    .setTween(imageAnimation)
    .setPin('#topper .wrap')
    .on('enter', function() {
        $('#site-nav').removeClass('go-absolute');
    })
    .on('leave', function() {
        $('#site-nav').addClass('go-absolute');
    });

    // Scene for Navigation
    navScene = new ScrollScene({
        triggerElement: 'main',
        offset: -1
    })
    .addTo(scrollMagicController)
    .setClassToggle('#site-nav', 'go-fixed');

    // Dev Only
    // imageScene.addIndicators();
    // navScene.addIndicators();

});