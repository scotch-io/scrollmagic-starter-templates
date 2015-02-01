/*===================================
=            GLOBAL VARS            =
===================================*/
var scrollMagicIsDestroyed = false;
var scrollMagicController = new ScrollMagic();




/*=================================
=            DOM READY            =
=================================*/
$(function() {

    // Only if not IE, not touch, and not mobile
    if ($(window).width() > 768 && !is_touch_device() && !is_ie()) {

        // $('section').height($(window).height());

        createScrollMagic();
    } else {
        $('body').addClass('no-scroll-magic');
    }
});




/*===================================
=            WINDOW LOAD            =
===================================*/
$(window).load(function() {

});




/*=====================================
=            WINDOW RESIZE            =
=====================================*/
$(window).resize(function() {

    // Kill for small screens
    if ($(window).width() <= 768 && !scrollMagicIsDestroyed) {
        destroyScrollMagic();
        scrollMagicIsDestroyed = true;
        $('body').addClass('no-scroll-magic');
    }

    // Force better DOM repainting hack. Helps on mobile
    $('html').addClass('force-gpu').removeClass('force-gpu');
});



/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function createScrollMagic() {

    $('section').each(function() {
        var cardTween = TweenMax.fromTo('#'+$(this).attr('id')+' .wrap', 1,
            {
                scale: 0,
                // z: 1,
                y: 500,
                x: 800,
                skewX: '200deg',
                transformPerspective: 200,
                rotation: '10deg'
            },
            {
                scale: 1,
                // z: 1,
                y: 0,
                x: 0,
                skewX: 0,
                rotation: 0
            }
        );

        var cardScene = new ScrollScene({
            triggerElement: '#'+$(this).attr('id'),
            duration: $(window).height() * 0.7,
            offset: -250
        })
        .addTo(scrollMagicController)
        .setTween(cardTween);
    });
}

function destroyScrollMagic() {
    scrollMagicController.destroy(true)
    scrollMagicController = null;
    $('*').removeAttr('style');
}

function is_touch_device() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

function is_ie() {
    // Disable for IE
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
        return true;
    }
}